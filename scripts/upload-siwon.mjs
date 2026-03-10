import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env.local', 'utf8');
for (const line of env.split('\n')) {
    const match = line.match(/^([^=]+)="?([^"]*)"?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
}

async function uploadDJSiwonPhotos() {
    const localDir = path.join(process.cwd(), 'public', 'artists', 'DJ Siwon');
    const artistsFile = path.join(process.cwd(), 'data', 'artists.json');
    const data = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));

    const siwon = data.find(a => a.name === 'DJ Siwon');
    if (!siwon) {
        console.error('DJ Siwon not found in JSON');
        return;
    }

    const newPhotos = [];
    for (let i = 1; i <= 3; i++) {
        const filename = `00${i}.jpg`;
        const filepath = path.join(localDir, filename);

        if (fs.existsSync(filepath)) {
            console.log(`Uploading ${filename} to Vercel Blob...`);
            const fileBuffer = fs.readFileSync(filepath);
            const blobPath = `artists/DJ Siwon/${filename}`;

            const { url } = await put(blobPath, fileBuffer, {
                access: 'public',
                addRandomSuffix: false,
                allowOverwrite: true,
            });
            console.log(`Success: ${url}`);
            newPhotos.push(url);
        } else {
            console.error(`Missing file: ${filepath}`);
        }
    }

    if (newPhotos.length > 0) {
        siwon.photos = newPhotos;
        fs.writeFileSync(artistsFile, JSON.stringify(data, null, 2));
        console.log('artists.json updated with new Blob URLs');
    }
}

uploadDJSiwonPhotos().catch(console.error);
