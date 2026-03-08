import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'artists.json');
let artistsData = JSON.parse(fs.readFileSync(dataPath, 'utf8').replace(/^\uFEFF/, ''));

// Target artist names or slugs (case-insensitive matching)
const targetNames = [
    'Tricky',
    'Mukthi',
    'Magarin',
    'Youkeep',
    'nwanji',
    'Suvin',
    'pluma',
    'Xia',
    'NotXerius'
].map(n => n.toLowerCase());

let updatedCount = 0;

for (const artist of artistsData) {
    const nameLower = artist.name.toLowerCase();
    const slugLower = artist.slug.toLowerCase();
    
    // Check if the artist matches our target list
    if (targetNames.includes(nameLower) || targetNames.includes(slugLower)) {
        // If the artist doesn't have an image field, we might not know their blob folder location.
        // Assuming the image points to their blob folder.
        if (artist.image) {
            const folderUrl = artist.image.substring(0, artist.image.lastIndexOf('/'));
            
            // Generate the Blob URLs for 001.jpg to 003.jpg
            const newPhotos = [
                `${folderUrl}/001.jpg`,
                `${folderUrl}/002.jpg`,
                `${folderUrl}/003.jpg`
            ];
            
            artist.photos = newPhotos;
            updatedCount++;
            console.log(`Updated ${artist.name} with new photos array.`);
            
            // Let's also verify if the local files exist (just to warn if they don't)
            // Local folder names might be different, but let's try to infer from artist name
            const possibleFolderNames = [artist.name, artist.slug, artist.name.replace(/\s+/g, '')];
            let foundLocal = false;
            for (const folder of possibleFolderNames) {
                const localFolder = path.join(process.cwd(), 'public', 'artists', folder);
                if (fs.existsSync(localFolder) && fs.existsSync(path.join(localFolder, '001.jpg'))) {
                    console.log(`  * Confirmed local folder: public/artists/${folder}`);
                    foundLocal = true;
                    break;
                }
            }
            if (!foundLocal) {
                console.warn(`  ! Could not easily verify local public/artists folder for ${artist.name}`);
            }
        } else {
            console.error(`Error: Artist ${artist.name} has no main image set. Cannot derive Blob URL.`);
        }
    }
}

if (updatedCount > 0) {
    fs.writeFileSync(dataPath, JSON.stringify(artistsData, null, 2), 'utf8');
    console.log(`\nSuccessfully updated ${updatedCount} artists in artists.json.`);
} else {
    console.log('\nNo artists were updated.');
}
