import { put, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

// Load env
const env = fs.readFileSync('.env.local', 'utf8');
for (const line of env.split('\n')) {
    const match = line.match(/^([^=]+)="?([^"]*)"?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
}

async function run() {
    const artistsFile = path.join(process.cwd(), 'data', 'artists.json');

    // 1. Pull fresh JSON from Blob
    console.log('Pulling latest artists.json from Blob...');
    const res = await fetch(`https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com/artists.json?t=${Date.now()}`);
    const data = await res.json();

    const siwon = data.find(a => a.name === 'DJ Siwon');
    if (!siwon) { console.error('DJ Siwon not found!'); return; }

    // 2. Delete all existing photos from Blob
    const existing = siwon.photos || [];
    console.log(`Deleting ${existing.length} existing photos...`);
    for (const url of existing) {
        try {
            await del(url);
            console.log(`  Deleted: ${url}`);
        } catch (e) {
            console.warn(`  Warning (non-fatal): could not delete ${url}: ${e.message}`);
        }
    }

    // 3. Upload 001, 002, 003 from local folder
    const localDir = path.join(process.cwd(), 'public', 'artists', 'DJ Siwon');
    const newPhotos = [];
    for (let i = 1; i <= 3; i++) {
        const filename = `00${i}.jpg`;
        const filepath = path.join(localDir, filename);
        if (!fs.existsSync(filepath)) { console.error(`Missing: ${filepath}`); continue; }

        const buffer = fs.readFileSync(filepath);
        const blobPath = `artists/DJ Siwon/${filename}`;
        console.log(`Uploading ${filename}...`);
        const { url } = await put(blobPath, buffer, {
            access: 'public',
            addRandomSuffix: false,
            allowOverwrite: true,
        });
        console.log(`  -> ${url}`);
        newPhotos.push(url);
    }

    // 4. Update artists.json and push to Blob
    siwon.photos = newPhotos;
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(artistsFile, json, 'utf8');
    await put('artists.json', json, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
    });

    console.log('\nDone! DJ Siwon photos updated:');
    newPhotos.forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
}

run().catch(console.error);
