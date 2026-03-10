import { list, put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const FOLDER = 'DJ Lant';
const SLUG = 'dj-lant';
const BLOB_FILENAME = 'artists.json';

async function processLant() {
    const dir = path.join(rootDir, 'public', 'artists', FOLDER);
    const files = fs.readdirSync(dir);
    const photoUrls = [];

    // 1. Upload originals and thumbs under correct slug path
    for (const file of files) {
        if (file.match(/^00[1-3]\.(jpg|png|jpeg)$/i)) {
            const ext = path.extname(file);
            const base = path.basename(file, ext);
            const originalPath = path.join(dir, file);

            // Upload original
            const content = fs.readFileSync(originalPath);
            const { url } = await put(`artists/${SLUG}/${file}`, content, {
                access: 'public', addRandomSuffix: false, allowOverwrite: true
            });
            console.log(`✅ Original uploaded: ${url}`);
            photoUrls.push(url);

            // Generate and upload thumb
            const thumbName = `${base}_thumb.webp`;
            const thumbPath = path.join(dir, thumbName);
            await sharp(originalPath).resize({ width: 400, withoutEnlargement: true }).webp({ quality: 60 }).toFile(thumbPath);
            const thumbContent = fs.readFileSync(thumbPath);
            const { url: thumbUrl } = await put(`artists/${SLUG}/${thumbName}`, thumbContent, {
                access: 'public', addRandomSuffix: false, allowOverwrite: true
            });
            console.log(`✅ Thumbnail uploaded: ${thumbUrl}`);
        }
    }

    // 2. Update artists.json
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
    const res = await fetch(targetBlob.url, { cache: 'no-store' });
    const artists = await res.json();
    const artist = artists.find(a => a.slug === SLUG);

    if (!artist) {
        console.error('❌ Still could not find slug:', SLUG);
        console.log('All DJ entries:', artists.filter(a => a.name.toLowerCase().includes('lant') || a.name.toLowerCase().includes('dj l')).map(a => `${a.name} -> ${a.slug}`));
        return;
    }

    photoUrls.sort();
    artist.photos = photoUrls;
    console.log(`✅ Attached ${photoUrls.length} photos to ${artist.name} (${SLUG})`);

    const jsonString = JSON.stringify(artists, null, 2);
    await put(BLOB_FILENAME, jsonString, {
        access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json'
    });
    fs.writeFileSync(path.join(rootDir, 'data', 'artists.json'), jsonString, 'utf8');
    console.log('✅ Live DB and local backup updated!');
}

processLant().catch(console.error);
