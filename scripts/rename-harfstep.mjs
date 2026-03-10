import fs from 'fs';

const data = JSON.parse(fs.readFileSync('data/artists.json', 'utf8').replace(/^\uFEFF/, ''));
const target = data.find(a => a.name.includes('Harfstep') && a.name.includes('&'));

if (target) {
    console.log(`Original Name: "${target.name}"`);
    target.name = 'Harfstep (Soo & Midori)';
    fs.writeFileSync('data/artists.json', JSON.stringify(data, null, 2));
    console.log('Renamed Harfstep successfully!');
} else {
    console.log('Harfstep not found containing an ampersand.');
}
