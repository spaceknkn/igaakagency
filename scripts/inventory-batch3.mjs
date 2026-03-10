import fs from 'fs';
import path from 'path';

const artists = [
    'Ruby', 'DJ Minky', 'X_X', 'Jiwoo', 'Cosmickey', 'miu', 'advanced', 'seorin', 'Siena'
];

const baseDir = path.join(process.cwd(), 'public', 'artists');

console.log('--- Batch 3 File Inventory ---');
for (const artist of artists) {
    const dir = path.join(baseDir, artist);
    if (!fs.existsSync(dir)) {
        console.log(`[ERROR] Folder not found: ${artist}`);
        continue;
    }
    
    const files = fs.readdirSync(dir).filter(f => /^00[1-3]\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f));
    console.log(`${artist}: ${files.join(', ')}`);
}
