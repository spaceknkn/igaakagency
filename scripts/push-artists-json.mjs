import { put } from '@vercel/blob';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
for (const line of env.split('\n')) {
    const match = line.match(/^([^=]+)="?([^"]*)"?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
}

async function run() {
    const data = fs.readFileSync('data/artists.json', 'utf8');
    await put('artists.json', data, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
    });
    console.log('✅ artists.json uploaded to Vercel Blob');
}
run().catch(console.error);
