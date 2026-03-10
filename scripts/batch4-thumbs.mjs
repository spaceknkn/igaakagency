import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const artistsFolders = [
    'DJ Badmon',
    'baeyoon',
    'Castle-J',
    'Dipcod',
    'XTC Project',
    'Hwayoung'
];

async function generateThumbnails() {
    for (const folder of artistsFolders) {
        const dir = path.join(rootDir, 'public', 'artists', folder);
        if (!fs.existsSync(dir)) {
            console.log(`❌ Folder not found: ${dir}`);
            continue;
        }

        const files = fs.readdirSync(dir);
        let count = 0;

        for (const file of files) {
            if (file.match(/^00[1-3]\.(jpg|png|jpeg)$/i)) {
                const ext = path.extname(file);
                const base = path.basename(file, ext);
                const thumbName = `${base}_thumb.webp`;
                const inputPath = path.join(dir, file);
                const outputPath = path.join(dir, thumbName);

                try {
                    await sharp(inputPath)
                        .resize({ width: 400, withoutEnlargement: true })
                        .webp({ quality: 60 })
                        .toFile(outputPath);
                    count++;
                } catch (err) {
                    console.error(`❌ Failed to process ${file} in ${folder}:`, err.message);
                }
            }
        }
        console.log(`✅ ${folder}: Generated ${count} thumbnails`);
    }
}

generateThumbnails().catch(console.error);
