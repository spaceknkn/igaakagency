/**
 * pull-db.mjs
 * Pulls the latest artists.json from the live Vercel Blob and overwrites the local copy.
 * Useful before running local scripts that need the latest admin changes.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    console.log('Downloading latest artists.json from live Vercel Blob...');
    const url = `https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com/artists.json?t=${Date.now()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const data = await res.json();
    
    const localPath = path.join(__dirname, '..', 'data', 'artists.json');
    fs.writeFileSync(localPath, JSON.stringify(data, null, 2));
    console.log(`✅ Successfully pulled ${data.length} artists and updated local data/artists.json`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
