import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'artists.json');
let artistsData = JSON.parse(fs.readFileSync(dataPath, 'utf8').replace(/^\uFEFF/, ''));

const targetSlug = 'dj-heejae';
const artist = artistsData.find(a => a.slug === targetSlug);

if (artist) {
    const folderUrl = artist.image.substring(0, artist.image.lastIndexOf('/'));
    
    // Generate the Blob URLs for 001.jpg to 005.jpg
    const newPhotos = [
        `${folderUrl}/001.jpg`,
        `${folderUrl}/002.jpg`,
        `${folderUrl}/003.jpg`,
        `${folderUrl}/004.jpg`,
        `${folderUrl}/005.jpg`
    ];
    
    artist.photos = newPhotos;
    fs.writeFileSync(dataPath, JSON.stringify(artistsData, null, 2), 'utf8');
    console.log(`Successfully updated ${artist.name} with 5 photos in artists.json.`);
} else {
    console.error(`Artist with slug ${targetSlug} not found.`);
}
