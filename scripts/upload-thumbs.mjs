import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const env = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8');
for (const line of env.split('\n')) {
    const m = line.match(/^([^=]+)="?([^"]*)"?$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
}

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function main() {
    const { blobs } = await list({ prefix: 'artists/', token: TOKEN });
    const existing = new Set(blobs.map(b => b.pathname));
    console.log('Existing blobs:', blobs.length);

    const artistsDir = path.join(ROOT, 'public', 'artists');
    const folders = fs.readdirSync(artistsDir);
    let uploaded = 0;

    for (const folder of folders) {
        const thumbPath = path.join(artistsDir, folder, 'thumb.webp');
        const blobPath = `artists/${folder}/thumb.webp`;
        if (fs.existsSync(thumbPath) && !existing.has(blobPath)) {
            const buf = fs.readFileSync(thumbPath);
            await put(blobPath, buf, {
                access: 'public', addRandomSuffix: false,
                contentType: 'image/webp', token: TOKEN
            });
            console.log('↑', blobPath);
            uploaded++;
        }
    }
    console.log(`Done: ${uploaded} thumbs uploaded`);
}

main().catch(console.error);
