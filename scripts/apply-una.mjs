import fs from 'fs';
import path from 'path';

const ARTISTS_JSON = path.join(process.cwd(), 'data', 'artists.json');
const raw = fs.readFileSync(ARTISTS_JSON, 'utf8');
const artists = JSON.parse(raw.replace(/^\uFEFF/, ''));

let updatedCount = 0;
for (const artist of artists) {
    if (artist.name === 'DJ U.NA') {
        const basePath = '/artists/DJ Una';
        artist.photos = [
            `${basePath}/001.jpg`,
            `${basePath}/002.jpg`,
            `${basePath}/003.jpg`
        ];
        updatedCount++;
        console.log(`Updated photos for: ${artist.name}`);
    }
}

if (updatedCount > 0) {
    fs.writeFileSync(ARTISTS_JSON, JSON.stringify(artists, null, 2), 'utf8');
    console.log(`Successfully updated ${updatedCount} artists in data/artists.json`);
} else {
    console.log('No artists updated.');
}
