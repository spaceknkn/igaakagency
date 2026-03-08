import fs from 'fs';

const data = JSON.parse(fs.readFileSync('data/artists.json', 'utf8').replace(/^\uFEFF/, ''));
const missingPhotos = data.filter(a => !a.photos || a.photos.length === 0);

console.log('Total DJs without detail photos: ' + missingPhotos.length);
missingPhotos.forEach(a => console.log('- ' + a.name));
