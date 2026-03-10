/**
 * reset-thumbs.mjs
 * Resets specified artists' thumbnailPosition to 'center center',
 * updates Vercel Blob DB, and re-generates their thumb.webp from the center.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THUMB_SIZE = 300;
const THUMB_QUALITY = 80;

const TARGET_NAMES = [
    'Vandalrock', 'Cosmickey', 'Ation', 'Daywalker', 'SoUL',
    'Castle-J', 'DJ Breeze', 'DJ Sarang', 'DJ Doha', 'DJ Riya',
    'Hyunyoung', 'DJ Siwon'
];

async function regenCenter(artist) {
    const { name, image, slug } = artist;
    if (!image) { console.log(`⚠  ${name}: No image`); return; }

    let srcBuffer;
    if (image.startsWith('http')) {
        const res = await fetch(`${image}?t=${Date.now()}`);
        if (!res.ok) { console.error(`  ✗ Failed to download for ${name}`); return; }
        srcBuffer = Buffer.from(await res.arrayBuffer());
    } else {
        const localPath = path.join(__dirname, '..', 'public', image);
        if (!fs.existsSync(localPath)) { console.error(`  ✗ Local image not found: ${localPath}`); return; }
        srcBuffer = fs.readFileSync(localPath);
    }

    const thumbBuffer = await sharp(srcBuffer)
        .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'centre' })
        .webp({ quality: THUMB_QUALITY })
        .toBuffer();

    // Save locally
    const localArtistDir = path.join(__dirname, '..', 'public', 'artists', slug || name);
    if (fs.existsSync(localArtistDir)) {
        fs.writeFileSync(path.join(localArtistDir, 'thumb.webp'), thumbBuffer);
        console.log(`  ✓ Local saved`);
    }

    // Upload to Vercel Blob
    const blobPath = `artists/${slug || name}/thumb.webp`;
    const { url } = await put(blobPath, thumbBuffer, {
        access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'image/webp',
    });
    console.log(`  ✓ Blob: ${url}`);
}

async function main() {
    const artistsPath = path.join(__dirname, '..', 'data', 'artists.json');
    const artists = JSON.parse(fs.readFileSync(artistsPath, 'utf8').replace(/^\uFEFF/, ''));

    const targets = artists.filter(a =>
        TARGET_NAMES.some(t => a.name.toLowerCase().includes(t.toLowerCase()))
    );
    console.log(`Resetting ${targets.length} artists to center center...\n`);

    // Reset thumbnailPosition
    let changed = 0;
    artists.forEach(a => {
        if (TARGET_NAMES.some(t => a.name.toLowerCase().includes(t.toLowerCase()))) {
            a.thumbnailPosition = 'center center';
            changed++;
        }
    });

    // Save updated artists.json
    fs.writeFileSync(artistsPath, JSON.stringify(artists, null, 2));
    console.log(`Updated ${changed} artists in local artists.json`);

    // Push to Vercel Blob
    const { put: putArtists } = await import('@vercel/blob');
    await put('artists.json', JSON.stringify(artists, null, 2), {
        access: 'public', addRandomSuffix: false, allowOverwrite: true,
        token: process.env.BLOB_READ_WRITE_TOKEN
    });
    console.log('Uploaded updated artists.json to Vercel Blob\n');

    // Regenerate thumbnails with center crop
    for (const artist of targets) {
        console.log(`Processing ${artist.name}...`);
        await regenCenter(artist);
    }

    console.log(`\nDone!`);
}

main().catch(err => { console.error(err); process.exit(1); });
