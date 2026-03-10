import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_NAMES = [
    'Castle-J'
];

async function main() {
    const artistsPath = path.join(__dirname, '..', 'data', 'artists.json');
    const artists = JSON.parse(fs.readFileSync(artistsPath, 'utf8').replace(/^\uFEFF/, ''));

    let changed = 0;
    artists.forEach(a => {
        if (TARGET_NAMES.some(t => a.name.toLowerCase().includes(t.toLowerCase()))) {
            a.useOriginalForThumbnail = true;
            changed++;
            console.log(`✓ Enabled override for ${a.name}`);
        }
    });

    console.log(`\nUpdated ${changed} artists.`);

    fs.writeFileSync(artistsPath, JSON.stringify(artists, null, 2));

    await put('artists.json', JSON.stringify(artists, null, 2), {
        access: 'public', addRandomSuffix: false, allowOverwrite: true,
        token: process.env.BLOB_READ_WRITE_TOKEN
    });

    console.log('✅ Synced to Vercel Blob!');
}

main().catch(err => { console.error(err); process.exit(1); });
