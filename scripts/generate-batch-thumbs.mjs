import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const artists = [
    'Ruby', 'DJ Minky', 'X_X', 'Jiwoo', 'Cosmickey', 'miu', 'advanced', 'seorin', 'Siena'
];
const THUMB_SIZE = 400;
const THUMB_QUALITY = 70;

async function generateBatchThumbs() {
    for (const artist of artists) {
        const targetFolder = path.join(process.cwd(), 'public', 'artists', artist);
        if (!fs.existsSync(targetFolder)) {
            console.error("Folder not found:", targetFolder);
            continue;
        }

        const files = fs.readdirSync(targetFolder).filter(f => /^00[1-5]\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f));
        
        for (const file of files) {
            if (file.startsWith('000.')) continue; 
            
            const srcPath = path.join(targetFolder, file);
            const name = path.parse(file).name;
            const outPath = path.join(targetFolder, `${name}_thumb.webp`);
            
            console.log(`Generating thumbnail for ${artist}/${file}...`);
            await sharp(srcPath)
                .resize(THUMB_SIZE)
                .webp({ quality: THUMB_QUALITY })
                .toFile(outPath);
            console.log(`✓ Created ${artist}/${name}_thumb.webp`);
        }
    }
}

generateBatchThumbs().catch(console.error);
