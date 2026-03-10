import { del } from '@vercel/blob';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
for (const line of env.split('\n')) {
    const match = line.match(/^([^=]+)="?([^"]*)"?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
}

// These are the wrong photos I uploaded that need to be removed
const wrongPhotos = [
    'https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com/artists/DJ%20Siwon/001.jpg',
    'https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com/artists/DJ%20Siwon/002.jpg',
    'https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com/artists/DJ%20Siwon/003.jpg',
];

async function cleanup() {
    const artistsFile = 'data/artists.json';
    const data = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));
    const siwon = data.find(a => a.name === 'DJ Siwon');

    // Clear the photos field
    siwon.photos = [];
    fs.writeFileSync(artistsFile, JSON.stringify(data, null, 2));
    console.log('Cleared DJ Siwon photos from artists.json');

    // Delete from Blob
    for (const url of wrongPhotos) {
        try {
            await del(url);
            console.log(`Deleted: ${url}`);
        } catch (e) {
            console.error(`Failed to delete ${url}:`, e.message);
        }
    }

    console.log('Done!');
}

cleanup().catch(console.error);
