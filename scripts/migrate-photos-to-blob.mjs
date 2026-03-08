// Migration script v2: Upload ALL artist images to Vercel Blob
// Handles: artist.image, artist.photos[], and thumb.webp
//
// Run: node scripts/migrate-photos-to-blob.mjs
// Requires: BLOB_READ_WRITE_TOKEN in .env.local

import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Load env
const envPath = path.join(ROOT, '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
for (const line of env.split('\n')) {
    const match = line.match(/^([^=]+)="?([^"]*)"?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Missing BLOB_READ_WRITE_TOKEN');
    process.exit(1);
}

const ARTISTS_JSON = path.join(ROOT, 'data', 'artists.json');
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function uploadFile(localPath, blobPath) {
    const buffer = fs.readFileSync(localPath);
    const ext = path.extname(localPath).toLowerCase();
    const contentType = ext === '.webp' ? 'image/webp' :
        ext === '.png' ? 'image/png' : 'image/jpeg';

    const blob = await put(blobPath, buffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType,
        token: TOKEN,
    });
    return blob.url;
}

async function resolveLocalPath(localPath, existing, blobs) {
    if (!localPath || localPath.startsWith('http')) return localPath;

    const blobPath = localPath.replace(/^\//, '');
    const localFile = path.join(ROOT, 'public', localPath);

    if (!fs.existsSync(localFile)) {
        console.log(`  ⚠️  Not found locally: ${localFile}`);
        return localPath; // keep original
    }

    if (existing.has(blobPath)) {
        const b = blobs.find(b => b.pathname === blobPath);
        console.log(`  ✓ Already in Blob: ${blobPath}`);
        return b.url;
    }

    console.log(`  ↑ Uploading: ${blobPath}`);
    return await uploadFile(localFile, blobPath);
}

async function main() {
    console.log('Loading artists.json...');
    const raw = fs.readFileSync(ARTISTS_JSON, 'utf8');
    const artists = JSON.parse(raw.replace(/^\uFEFF/, ''));

    console.log('Fetching existing Vercel Blob files...');
    const { blobs } = await list({ prefix: 'artists/', token: TOKEN });
    const existing = new Set(blobs.map(b => b.pathname));
    console.log(`Found ${blobs.length} existing files in Blob\n`);

    let updated = 0;
    let uploaded = 0;

    const origUpload = uploadFile;
    // Wrap to count uploads  
    const trackedUpload = async (localPath, blobPath) => {
        const url = await origUpload(localPath, blobPath);
        uploaded++;
        return url;
    };

    for (const artist of artists) {
        let artistUpdated = false;
        console.log(`Processing: ${artist.name}`);

        // 1. Migrate artist.image
        if (artist.image && !artist.image.startsWith('http')) {
            const newUrl = await resolveLocalPath(artist.image, existing, blobs);
            if (newUrl !== artist.image) {
                if (!existing.has(artist.image.replace(/^\//, ''))) uploaded++;
                artist.image = newUrl;
                artistUpdated = true;
            }

            // 2. Migrate thumb.webp (derived from image path)
            const imagePath = artist.image.startsWith('http')
                ? null
                : artist.image;
            if (!imagePath) {
                // image is now a blob URL - try to find thumb.webp alongside
                const origImage = blobs.find(b => b.url === artist.image)?.pathname;
                if (origImage) {
                    const thumbLocal = path.join(ROOT, 'public', path.dirname('/' + origImage), 'thumb.webp');
                    const thumbBlobPath = path.dirname(origImage) + '/thumb.webp';
                    if (fs.existsSync(thumbLocal) && !existing.has(thumbBlobPath)) {
                        console.log(`  ↑ Uploading: ${thumbBlobPath}`);
                        await uploadFile(thumbLocal, thumbBlobPath);
                        uploaded++;
                    }
                }
            } else {
                const thumbLocalPath = path.join(path.dirname(imagePath), 'thumb.webp');
                const thumbLocal = path.join(ROOT, 'public', thumbLocalPath.startsWith('/') ? thumbLocalPath : '/' + thumbLocalPath);
                const thumbBlobPath = thumbLocalPath.replace(/^\//, '');
                if (fs.existsSync(thumbLocal) && !existing.has(thumbBlobPath)) {
                    console.log(`  ↑ Uploading: ${thumbBlobPath}`);
                    await uploadFile(thumbLocal, thumbBlobPath);
                    uploaded++;
                }
            }
        }

        // 3. Migrate photos array
        if (artist.photos && artist.photos.length > 0) {
            const newPhotos = [];
            for (const p of artist.photos) {
                if (p.startsWith('http')) {
                    newPhotos.push(p);
                    continue;
                }
                const blobPath = p.replace(/^\//, '');
                const localFile = path.join(ROOT, 'public', p);
                if (existing.has(blobPath)) {
                    newPhotos.push(blobs.find(b => b.pathname === blobPath)?.url || p);
                } else if (fs.existsSync(localFile)) {
                    console.log(`  ↑ Uploading: ${blobPath}`);
                    const url = await uploadFile(localFile, blobPath);
                    newPhotos.push(url);
                    uploaded++;
                } else {
                    console.log(`  ⚠️  Not found: ${localFile}`);
                    newPhotos.push(p);
                }
            }
            if (JSON.stringify(newPhotos) !== JSON.stringify(artist.photos)) {
                artist.photos = newPhotos;
                artistUpdated = true;
            }
        }

        if (artistUpdated) updated++;
    }

    if (updated > 0 || uploaded > 0) {
        console.log(`\nSaving updated artists.json (${updated} artists, ${uploaded} files uploaded)...`);
        fs.writeFileSync(ARTISTS_JSON, JSON.stringify(artists, null, 2), 'utf8');
        console.log('Done! Now: git add data/artists.json && git commit -m "migrate all images" && npx vercel --prod');
    } else {
        console.log('\nNo updates needed - all images already in Blob.');
    }
}

main().catch(console.error);
