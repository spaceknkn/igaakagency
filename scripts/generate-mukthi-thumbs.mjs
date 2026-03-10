import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const targetFolder = path.join(process.cwd(), 'public', 'artists', 'Mukthi');
const THUMB_SIZE = 400;
const THUMB_QUALITY = 70;

async function generateMukthiThumbs() {
    if (!fs.existsSync(targetFolder)) {
        console.error("Folder not found:", targetFolder);
        return;
    }

    // Handle .JPG (uppercase) as well
    const files = fs.readdirSync(targetFolder).filter(f => /^00[1-5]\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f));
    
    for (const file of files) {
        if (file === '000.jpg') continue; // Use 000 thumb for admin already
        
        const srcPath = path.join(targetFolder, file);
        const name = path.parse(file).name; // 001, 002, etc.
        const outPath = path.join(targetFolder, `${name}_thumb.webp`);
        
        console.log(`Generating thumbnail for ${file}...`);
        await sharp(srcPath)
            .resize(THUMB_SIZE)
            .webp({ quality: THUMB_QUALITY })
            .toFile(outPath);
        console.log(`✓ Created ${name}_thumb.webp`);
    }
}

generateMukthiThumbs().catch(console.error);
