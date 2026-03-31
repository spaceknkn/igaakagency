const fs = require('fs');
const path = require('path');

const jsonPath = 'g:/Ai Ai Ai/Antigravity/igaak_new/data/artists.json';
const publicDir = 'g:/Ai Ai Ai/Antigravity/igaak_new/public';

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Pattern to match any Vercel Blob store URLs in this project
const blobPattern = /https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com(\/artists\/.*)/i;

let updatedCount = 0;

function resolveLocalPath(url) {
    if (typeof url !== 'string') return url;
    const match = url.match(blobPattern);
    if (!match) return url;

    const relativePath = match[1];
    const decodedPath = decodeURIComponent(relativePath);

    const fullLocalPath = path.join(publicDir, decodedPath.replace(/\//g, path.sep));

    if (fs.existsSync(fullLocalPath)) {
        return decodedPath;
    } else {
        // Log skip if needed
        return url;
    }
}

function processValue(val) {
    if (Array.isArray(val)) {
        return val.map(item => processValue(item));
    } else if (typeof val === 'string') {
        const newVal = resolveLocalPath(val);
        if (newVal !== val) {
            updatedCount++;
            return newVal;
        }
        return val;
    }
    return val;
}

const updatedData = data.map(artist => {
    for (const key in artist) {
        // Only process common image-related fields or strings/arrays
        if (['image', 'photos', 'thumbnails', 'mobileImage', 'gallery'].includes(key)) {
            artist[key] = processValue(artist[key]);
        }
    }
    return artist;
});

fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2), 'utf8');

console.log(`Updated ${updatedCount} image paths to local relative paths.`);
