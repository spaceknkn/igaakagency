const fs = require('fs');
const path = require('path');

const jsonPath = 'g:/Ai Ai Ai/Antigravity/igaak_new/data/artists.json';
const publicDir = 'g:/Ai Ai Ai/Antigravity/igaak_new/public';
const artistsDir = path.join(publicDir, 'artists');

// Get all directories in public/artists
const artistFolders = fs.readdirSync(artistsDir).filter(f => fs.statSync(path.join(artistsDir, f)).isDirectory());

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let changeCount = 0;

function findLocalFile(blobUrl, artist) {
    if (!blobUrl.includes('vercel-storage.com')) return blobUrl;

    // Pattern: .../artists/FOLDER_NAME/FILE_NAME
    const parts = blobUrl.split('/');
    const fileName = parts[parts.length - 1].split('?')[0]; // Handle query params if any
    const urlFolder = decodeURIComponent(parts[parts.length - 2]);

    // Candidates for the local folder name
    const candidates = [
        urlFolder,                   // Folder from URL
        artist.name,                 // Artist Name
        artist.slug,                 // Artist Slug
        artist.name.replace(/^DJ\s+/, ''), // Name without "DJ " prefix
        `DJ ${artist.name}`,          // Name with "DJ " prefix
        artist.slug.replace(/^dj-/, '')   // Slug without "dj-" prefix
    ];

    for (const cand of candidates) {
        if (!cand) continue;

        // Find a case-insensitive match in artistFolders
        const matchedFolder = artistFolders.find(f => f.toLowerCase() === cand.toLowerCase());
        if (matchedFolder) {
            const localFilePath = path.join(artistsDir, matchedFolder, fileName);
            if (fs.existsSync(localFilePath)) {
                // Return the correctly-cased relative path
                return `/artists/${matchedFolder}/${fileName}`;
            }
        }
    }

    console.log(`[FAILED] Could not find local file for: ${blobUrl} (Artist: ${artist.name})`);
    return blobUrl;
}

const updatedData = data.map(artist => {
    for (const key in artist) {
        if (['image', 'photos', 'thumbnails', 'mobileImage', 'gallery'].includes(key)) {
            const val = artist[key];
            if (Array.isArray(val)) {
                artist[key] = val.map(v => findLocalFile(v, artist));
                // Side effect: increment changeCount if any item changed
                val.forEach((v, i) => {
                    if (v !== artist[key][i]) changeCount++;
                });
            } else {
                const newVal = findLocalFile(val, artist);
                if (newVal !== val) {
                    artist[key] = newVal;
                    changeCount++;
                }
            }
        }
    }
    return artist;
});

fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2), 'utf8');

console.log(`\nMigration V3 complete. Fixed ${changeCount} remaining Blob URLs.`);
