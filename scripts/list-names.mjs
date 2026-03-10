import fs from 'fs';
const raw = fs.readFileSync('data/artists.json', 'utf8');
const artists = JSON.parse(raw.replace(/^\uFEFF/, ''));
console.log(artists.map(a => a.name));
