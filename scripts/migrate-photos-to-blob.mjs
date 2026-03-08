// Migration script: Upload public/artists photos to Vercel Blob
// and update artists.json with new Blob URLs
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
const ARTISTS_DIR = path.join(ROOT, 'public', 'artists');

async function uploadFile(localPath, blobPath) {
    const buffer = fs.readFileSync(localPath);
    const ext = path.extname(localPath).toLowerCase();
    const contentType = ext === '.webp' ? 'image/webp' :
        ext === '.png' ? 'image/png' : 'image/jpeg';

    const blob = await put(blobPath, buffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType,
        token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
}

async function main() {
    console.log('Loading artists.json...');
    const raw = fs.readFileSync(ARTISTS_JSON, 'utf8');
    const artists = JSON.parse(raw.replace(/^\uFEFF/, ''));

    // Get existing blobs to avoid re-uploading
    console.log('Fetching existing Vercel Blob files...');
    const { blobs } = await list({ prefix: 'artists/', token: process.env.BLOB_READ_WRITE_TOKEN });
    const existing = new Set(blobs.map(b => b.pathname));
    console.log(`Found ${blobs.length} existing files in Blob`);

    let updated = 0;
    let uploaded = 0;
    let skipped = 0;

    for (const artist of artists) {
        if (!artist.photos || artist.photos.length === 0) continue;
        
        const newPhotos = [];
        for (const photoPath of artist.photos) {
            // Already a Blob URL - keep as is
            if (photoPath.startsWith('http')) {
                newPhotos.push(photoPath);
                continue;
            }

            // Local path e.g. /artists/DJ Kara/001.jpg
            const localFile = path.join(ROOT, 'public', photoPath);
            if (!fs.existsSync(localFile)) {
                console.log(`  ⚠️  File not found: ${localFile}`);
                newPhotos.push(photoPath); // keep original
                skipped++;
                continue;
            }

            // Build blob path: artists/DJ Kara/001.jpg
            const blobPath = photoPath.replace(/^\//, ''); // remove leading /

            if (existing.has(blobPath)) {
                // Already uploaded - use existing URL
                const existingBlob = blobs.find(b => b.pathname === blobPath);
                newPhotos.push(existingBlob.url);
                console.log(`  ✓ Already in Blob: ${blobPath}`);
            } else {
                // Upload it
                console.log(`  ↑ Uploading: ${blobPath}`);
                const url = await uploadFile(localFile, blobPath);
                newPhotos.push(url);
                uploaded++;
            }
        }

        if (JSON.stringify(newPhotos) !== JSON.stringify(artist.photos)) {
            artist.photos = newPhotos;
            updated++;
        }
    }

    // Save updated artists.json
    if (updated > 0) {
        console.log(`\nSaving updated artists.json (${updated} artists updated, ${uploaded} files uploaded)...`);
        fs.writeFileSync(ARTISTS_JSON, JSON.stringify(artists, null, 2), 'utf8');
        console.log('Done! Now run: git add data/artists.json && git commit && npx vercel --prod');
    } else {
        console.log('\nNo updates needed.');
    }

    console.log(`\nSummary: ${uploaded} uploaded, ${skipped} skipped (not found), ${updated} artists updated`);
}

main().catch(console.error);
