import fs from 'fs';
import path from 'path';

const artistsToUpdate = [
    { name: 'Ruby', slug: 'ruby' },
    { name: 'DJ Minky', slug: 'minky' },
    { name: 'X_X(Two X)', slug: 'xx', folder: 'X_X' },
    { name: 'Jiwoo', slug: 'jiwoo' },
    { name: 'Cosmickey', slug: 'cosmickey' },
    { name: 'miu', slug: 'miu' },
    { name: 'advanced', slug: 'advanced' },
    { name: 'seorin', slug: 'seorin' },
    { name: 'Siena', slug: 'siena' }
];

const blobBaseUrl = 'https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com';
const jsonPath = path.join(process.cwd(), 'data', 'artists.json');

async function updateArtistsJson() {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, ''));
    let updatedCount = 0;

    for (const artistInfo of artistsToUpdate) {
        const artist = data.find(a => a.slug === artistInfo.slug || a.name === artistInfo.name);
        if (artist) {
            const folderName = artistInfo.folder || artistInfo.name;
            const localFolder = path.join(process.cwd(), 'public', 'artists', folderName);
            const detailFiles = fs.readdirSync(localFolder).filter(f => /^00[1-3]\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f));
            
            if (detailFiles.length > 0) {
                const encodedName = encodeURIComponent(folderName).replace(/%20/g, '%20'); 
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
