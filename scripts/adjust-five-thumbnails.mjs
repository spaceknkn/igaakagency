import { list, put } from '@vercel/blob';
import fs from 'fs';

// Configuration
const targets = {
    'Vandalrock': 'center 10%', // Usually standard DJ photos need to be moved down to avoid forehead cutoff
    'SoUL': 'center 15%', // Slight adjustment down
    'DJ Doha': 'center 15%',
    'DJ Riya': 'center 15%',
    'DJ Siwon': 'center 10%'
};

async function main() {
    console.log('Fetching artists from Vercel Blob...');
    const { blobs } = await list({ prefix: 'artists.json' });
    const blob = blobs.find(b => b.pathname === 'artists.json');
    if (!blob) throw new Error('artists.json not found on Blob');

    const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`);
    const artists = await res.json();

    let updated = 0;
    artists.forEach(a => {
        // loose match since names might have whitespace or capitalization
        const targetName = Object.keys(targets).find(t => a.name.toLowerCase().includes(t.toLowerCase()));
        if (targetName) {
            console.log(`Updating ${a.name}: ${a.thumbnailPosition} -> ${targets[targetName]}`);
            a.thumbnailPosition = targets[targetName];
            updated++;
        }
    });

    if (updated > 0) {
        console.log(`Uploading ${updated} updated artists to Vercel Blob...`);
        await put('artists.json', JSON.stringify(artists, null, 2), {
            access: 'public',
            addRandomSuffix: false,
            allowOverwrite: true,
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
        
        // also save locally just in case
        fs.writeFileSync('data/artists.json', JSON.stringify(artists, null, 2));
        console.log('Done!');
    } else {
        console.log('No targets found.');
    }
}

main().catch(console.error);
