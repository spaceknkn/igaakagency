const fs = require('fs');
const path = require('path');

const artistsPath = path.join(__dirname, '..', 'data', 'artists.json');
const data = JSON.parse(fs.readFileSync(artistsPath, 'utf8').replace(/^\uFEFF/, ''));

const target = data.find(a => a.name === 'Harfstep ( Soo & Midori )');

if (target) {
    target.name = 'Harfstep (Soo & Midori)';
    fs.writeFileSync(artistsPath, JSON.stringify(data, null, 2));
    console.log('Successfully renamed Harfstep!');
} else {
    console.log('Could not find existing Harfstep string');
}
