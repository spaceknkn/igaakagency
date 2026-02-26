import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const artistsDir = path.join(__dirname, '..', 'public', 'artists');

const THUMB_SIZE = 300;
const THUMB_QUALITY = 75;
const THUMB_NAME = 'thumb.webp';

async function generateThumbnails() {
    if (!fs.existsSync(artistsDir)) {
        console.log("No artists directory found, skipping thumbnail generation.");
        return;
    }

    const folders = fs.readdirSync(artistsDir, { withFileTypes: true })
        .filter(d => d.isDirectory());

    let created = 0;
    let skipped = 0;
    let errors = 0;

    for (const folder of folders) {
        const folderPath = path.join(artistsDir, folder.name);

        // Find the main profile image (000.jpg, 000.jpeg, 000.png, 000.JPG, etc.)
        const candidates = fs.readdirSync(folderPath)
            .filter(f => /^000\.(jpg|jpeg|png|webp)$/i.test(f));

        if (candidates.length === 0) {
            continue;
        }

        const srcFile = path.join(folderPath, candidates[0]);
        const thumbFile = path.join(folderPath, THUMB_NAME);

        // Skip if thumb already exists and is newer than source
        if (fs.existsSync(thumbFile)) {
            const srcStat = fs.statSync(srcFile);
            const thumbStat = fs.statSync(thumbFile);
            if (thumbStat.mtimeMs > srcStat.mtimeMs) {
                skipped++;
                continue;
            }
        }

        try {
            await sharp(srcFile)
                .resize(THUMB_SIZE, THUMB_SIZE, {
                    fit: 'cover',
                    position: 'centre',
                })
                .webp({ quality: THUMB_QUALITY })
                .toFile(thumbFile);
            created++;
            console.log(`✓ ${folder.name}`);
        } catch (err) {
            errors++;
            console.error(`✗ ${folder.name}: ${err.message}`);
        }
    }

    console.log(`\nDone! Created: ${created}, Skipped: ${skipped}, Errors: ${errors}`);
}

generateThumbnails();
