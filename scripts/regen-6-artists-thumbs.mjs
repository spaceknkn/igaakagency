import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const artistsDir = path.join(__dirname, '..', 'public', 'artists');

// The 6 artists and their folder names
const targets = [
    { folder: 'Guilty Pleasure', photos: ['001.jpg', '002.jpg', '003.jpg'] },
    { folder: 'Cream',           photos: ['001.jpg', '002.jpg', '003.jpg', '004.jpg'] },
    { folder: 'Siena',           photos: ['001.jpg', '002.jpg', '003.jpg'], mainImage: '000.JPG' },
    { folder: 'DJ IRUMI',        photos: ['001.jpg', '002.jpg', '003.jpg'] },
    { folder: 'pluma',           photos: ['001.jpg', '002.jpg', '003.jpg', '004.jpg', '005.jpg', '006.JPG'] },
    { folder: 'baeyoon',         photos: ['001.jpg', '002.jpg', '003.jpg'] },
];

const THUMB_SIZE = 400;
const THUMB_QUALITY = 70;

async function run() {
    for (const target of targets) {
        const folderPath = path.join(artistsDir, target.folder);
        if (!fs.existsSync(folderPath)) {
            console.error(`FOLDER NOT FOUND: ${target.folder}`);
            continue;
        }

        // Regenerate main profile thumb.webp from 000 image
        const mainFile = fs.readdirSync(folderPath).find(f => /^000\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/i.test(f));
        if (mainFile) {
            const srcPath = path.join(folderPath, mainFile);
            const outPath = path.join(folderPath, 'thumb.webp');
            try {
                await sharp(srcPath)
                    .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'centre' })
                    .webp({ quality: THUMB_QUALITY })
                    .toFile(outPath);
                console.log(`✓ ${target.folder}/thumb.webp`);
            } catch (e) { console.error(`✗ ${target.folder}/thumb.webp: ${e.message}`); }
        }

        // Regenerate detail photo thumbs
        for (const photo of target.photos) {
            const srcPath = path.join(folderPath, photo);
            if (!fs.existsSync(srcPath)) {
                console.error(`  NOT FOUND: ${target.folder}/${photo}`);
                continue;
            }
            const name = path.parse(photo).name;
            const outPath = path.join(folderPath, `${name}_thumb.webp`);
            try {
                await sharp(srcPath)
                    .resize(THUMB_SIZE)
                    .webp({ quality: THUMB_QUALITY })
                    .toFile(outPath);
                console.log(`  ✓ ${target.folder}/${name}_thumb.webp`);
            } catch (e) { console.error(`  ✗ ${target.folder}/${photo}: ${e.message}`); }
        }
    }
    console.log('\n✅ Thumbnail regeneration complete!');
}

run().catch(console.error);
