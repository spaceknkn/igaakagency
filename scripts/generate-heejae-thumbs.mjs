import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const targetFolder = path.join(process.cwd(), 'public', 'artists', 'DJ Heejae');
const THUMB_SIZE = 400;
const THUMB_QUALITY = 70;

async function generateHeejaeThumbs() {
    if (!fs.existsSync(targetFolder)) {
        console.error("Folder not found:", targetFolder);
        return;
    }

    const files = fs.readdirSync(targetFolder).filter(f => /^00[1-5]\.(jpg|jpeg|png)$/i.test(f));
    
    for (const file of files) {
        const srcPath = path.join(targetFolder, file);
        const name = path.parse(file).name; // 001, 002, etc.
        const outPath = path.join(targetFolder, `${name}_thumb.webp`);
        
        console.log(`Generating thumbnail for ${file}...`);
        await sharp(srcPath)
            .resize(THUMB_SIZE) // Width THUMB_SIZE, height keeps aspect ratio
            .webp({ quality: THUMB_QUALITY })
            .toFile(outPath);
        console.log(`✓ Created ${name}_thumb.webp`);
    }
}

generateHeejaeThumbs().catch(console.error);
