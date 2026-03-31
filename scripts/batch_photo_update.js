const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'artists.json');
const publicDir = path.join(__dirname, '..', 'public', 'artists');

let data = JSON.parse(fs.readFileSync(dataFile, 'utf8').replace(/^\uFEFF/, ''));

function findArtist(name) {
    return data.find(a => a.name === name);
}

// ── 1. Guilty Pleasure: replace 003 with local file ──
{
    const a = findArtist('Guilty Pleasure');
    if (!a) { console.error('NOT FOUND: Guilty Pleasure'); process.exit(1); }
    // Find index of current 003 style entry
    const idx003 = a.photos.findIndex(p => /003\.(jpg|jpeg|png|webp|JPG)/i.test(p));
    if (idx003 === -1) { console.error('003 not found in Guilty Pleasure photos'); process.exit(1); }
    a.photos[idx003] = '/artists/Guilty Pleasure/003.jpg';
    console.log(`Guilty Pleasure: replaced photos[${idx003}] -> /artists/Guilty Pleasure/003.jpg`);
}

// ── 2. Cream: delete 001,002,003 add 001,002,003,004 ──
{
    const a = findArtist('Cream');
    if (!a) { console.error('NOT FOUND: Cream'); process.exit(1); }
    a.photos = [
        '/artists/Cream/001.jpg',
        '/artists/Cream/002.jpg',
        '/artists/Cream/003.jpg',
        '/artists/Cream/004.jpg',
    ];
    console.log('Cream: photos set to 001-004');
}

// ── 3. Siena: replace 000 profile image ──
{
    const a = findArtist('Siena');
    if (!a) { console.error('NOT FOUND: Siena'); process.exit(1); }
    a.image = '/artists/Siena/000.JPG';
    // Keep existing positions (user will want to adjust separately)
    console.log('Siena: image set to /artists/Siena/000.JPG');
}

// ── 4. IRUMI: replace 003 with local DJ IRUMI/003.jpg ──
{
    // Try various name spellings
    const a = data.find(a => a.name && a.name.toUpperCase().includes('IRUMI'));
    if (!a) { console.error('NOT FOUND: IRUMI'); process.exit(1); }
    console.log('IRUMI artist found:', a.name, '| current photos:', a.photos);
    const idx003 = a.photos.findIndex(p => /003\.(jpg|jpeg|png|webp|JPG)/i.test(p));
    if (idx003 === -1) { console.error('003 not found in IRUMI photos'); process.exit(1); }
    a.photos[idx003] = '/artists/DJ IRUMI/003.jpg';
    console.log(`IRUMI: replaced photos[${idx003}] -> /artists/DJ IRUMI/003.jpg`);
}

// ── 5. Pluma: delete 002,003 add 002,003,004,005,006 ──
{
    const a = data.find(a => a.name && a.name.toLowerCase() === 'pluma');
    if (!a) { console.error('NOT FOUND: Pluma'); process.exit(1); }
    console.log('Pluma found:', a.name, '| current photos:', a.photos);
    // Keep 001, replace rest
    const keep001 = a.photos.find(p => /001\.(jpg|jpeg|png|webp|JPG)/i.test(p)) || '/artists/pluma/001.jpg';
    a.photos = [
        keep001,
        '/artists/pluma/002.jpg',
        '/artists/pluma/003.jpg',
        '/artists/pluma/004.jpg',
        '/artists/pluma/005.jpg',
        '/artists/pluma/006.JPG',
    ];
    console.log('Pluma: photos set to 001-006');
}

// ── 6. Baeyoon: replace 002,003 with local files ──
{
    const a = data.find(a => a.name && a.name.toLowerCase() === 'baeyoon');
    if (!a) { console.error('NOT FOUND: Baeyoon'); process.exit(1); }
    console.log('Baeyoon found:', a.name, '| current photos:', a.photos);
    // Keep 001, replace 002 and 003
    const keep001 = a.photos.find(p => /001\.(jpg|jpeg|png|webp|JPG)/i.test(p)) || '/artists/baeyoon/001.jpg';
    a.photos = [
        keep001,
        '/artists/baeyoon/002.jpg',
        '/artists/baeyoon/003.jpg',
    ];
    console.log('Baeyoon: photos set to 001-003');
}

// ── Save ──
fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log('\n✅ All updates saved to artists.json');
