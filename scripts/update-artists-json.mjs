import fs from 'fs';
import path from 'path';

const artistsToUpdate = [
    { name: 'DJ Moai', slug: 'dj-moai' },
    { name: 'DJ Riya', slug: 'dj-riya' },
    { name: 'zb', slug: 'zb' },
    { name: 'Risho', slug: 'risho' }
];

const blobBaseUrl = 'https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com';
const jsonPath = path.join(process.cwd(), 'data', 'artists.json');

async function updateArtistsJson() {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, ''));
    let updatedCount = 0;

    for (const artistInfo of artistsToUpdate) {
        const artist = data.find(a => a.slug === artistInfo.slug || a.name === artistInfo.name);
        if (artist) {
            // For these artists, we assume 001, 002, 003 exist and are .jpg or .JPG
            // Let's check the local folder to get the exact extension
            const localFolder = path.join(process.cwd(), 'public', 'artists', artistInfo.name);
            const detailFiles = fs.readdirSync(localFolder).filter(f => /^00[1-3]\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f));
            
            if (detailFiles.length > 0) {
                const encodedName = encodeURIComponent(artistInfo.name).replace(/%20/g, '%20'); 
                // Note: encodeURIComponent encodes space as %20, which is what we want.
                artist.photos = detailFiles.map(f => `${blobBaseUrl}/artists/${encodedName}/${f}`);
                console.log(`Updated photos for ${artistInfo.name}`);
                updatedCount++;
            }
        } else {
            console.warn(`Artist not found in JSON: ${artistInfo.name}`);
        }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`\n🎉 Successfully updated ${updatedCount} artists in artists.json`);
}

updateArtistsJson().catch(console.error);
