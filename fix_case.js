const fs = require('fs');
const path = require('path');

const jsonPath = 'g:/Ai Ai Ai/Antigravity/igaak_new/data/artists.json';
const publicDir = 'g:/Ai Ai Ai/Antigravity/igaak_new/public';

// Get all files recursively to map lowercase paths to actual paths
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            // Get relative path from public dir
            const fullPath = path.join(dirPath, file);
            const relativePath = '/' + path.relative(publicDir, fullPath).replace(/\\/g, '/');
            arrayOfFiles.push(relativePath);
        }
    });

    return arrayOfFiles;
}

const allLocalFiles = getAllFiles(path.join(publicDir, 'artists'));
const pathMap = {}; // lowercase -> actual
allLocalFiles.forEach(p => {
    pathMap[p.toLowerCase()] = p;
});

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let fixCount = 0;

function fixCase(curPath) {
    if (!curPath || !curPath.startsWith('/artists/')) return curPath;

    // Check if current path exists exactly (unreliable on Windows fs.existsSync)
    // So we use our map
    const target = pathMap[curPath.toLowerCase()];
    if (target && target !== curPath) {
        fixCount++;
        return target;
    }
    return curPath;
}

const updatedData = data.map(artist => {
    // Process all fields
    for (const key in artist) {
        if (['image', 'photos', 'thumbnails', 'mobileImage', 'gallery'].includes(key)) {
            const val = artist[key];
            if (Array.isArray(val)) {
                artist[key] = val.map(v => fixCase(v));
            } else {
                artist[key] = fixCase(val);
            }
        }
    }
    return artist;
});

fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2), 'utf8');

console.log(`Fixed case-sensitivity for ${fixCount} paths.`);
