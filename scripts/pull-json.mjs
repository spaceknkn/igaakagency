import { get } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env.local', 'utf8');
for (const line of env.split('\n')) {
    const match = line.match(/^([^=]+)="?([^"]*)"?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
}

async function run() {
    const response = await fetch(`https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com/artists.json?t=${Date.now()}`);
    const data = await response.json();
    fs.writeFileSync('data/artists.json', JSON.stringify(data, null, 2), 'utf8');
    console.log('Successfully pulled latest artists.json from Vercel Blob');
}
run().catch(console.error);
