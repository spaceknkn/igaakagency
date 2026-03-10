/**
 * unset-original-thumbnail.mjs
 * 
 * Removes the useOriginalForThumbnail flag for specified artists,
 * restoring the fast thumb.webp behavior on the Roster page.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_NAMES = [
    'Jina', 'DJ Cold', 'DJ Vaha'
];

async function main() {
    const artistsPath = path.join(__dirname, '..', 'data', 'artists.json');
    const artists = JSON.parse(fs.readFileSync(artistsPath, 'utf8').replace(/^\uFEFF/, ''));

    let changed = 0;
    artists.forEach(a => {
        if (TARGET_NAMES.some(t => a.name.toLowerCase().includes(t.toLowerCase()))) {
            delete a.useOriginalForThumbnail;
            changed++;
            console.log(`✓ Restored thumb.webp optimization for ${a.name}`);
        }
    });

    console.log(`\nUpdated ${changed} artists.`);
    fs.writeFileSync(artistsPath, JSON.stringify(artists, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
