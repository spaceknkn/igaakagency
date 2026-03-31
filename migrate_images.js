const fs = require('fs');
const path = require('path');

const jsonPath = 'g:/Ai Ai Ai/Antigravity/igaak_new/data/artists.json';
const publicDir = 'g:/Ai Ai Ai/Antigravity/igaak_new/public';

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const blobPattern = /https:\/\/hn5lsrd5hvli3ttm\.public\.blob\.vercel-storage\.com(\/artists\/.*)/;

let updatedCount = 0;

function resolveLocalPath(url) {
    if (!url) return url;
    const match = url.match(blobPattern);
    if (!match) return url;

    const relativePath = match[1];
    const decodedPath = decodeURIComponent(relativePath);

    const fullLocalPath = path.join(publicDir, decodedPath.replace(/\//g, path.sep));

    if (fs.existsSync(fullLocalPath)) {
        return decodedPath; // Returns something like /artists/Juncoco/000.jpg
    } else {
        // Log skip if needed
        return url;
    }
}

const updatedData = data.map(artist => {
    // Update main image
    if (artist.image) {
        const newPath = resolveLocalPath(artist.image);
        if (newPath !== artist.image) {
            artist.image = newPath;
            updatedCount++;
        }
    }

    // Update photos array
    if (artist.photos && Array.isArray(artist.photos)) {
        artist.photos = artist.photos.map(photo => {
            const newPath = resolveLocalPath(photo);
            if (newPath !== photo) {
                updatedCount++;
                return newPath;
            }
            return photo;
        });
    }

    return artist;
});

fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2), 'utf8');

console.log(`Updated ${updatedCount} image paths to local relative paths.`);
