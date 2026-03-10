/**
 * upload-hyunyoung-soul-details.mjs
 * 
 * Script specifically designed to process Hyunyoung and SoUL's detail photos (001-003.jpg),
 * generate their webp thumbnails, upload them to Vercel Blob, update their database entries,
 * and add Hyunyoung's Instagram link.
 */
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THUMB_SIZE = 400;

const targets = [
    { dirName: 'hyunyoung', dbName: 'Hyunyoung(Rainbow)', instagram: 'https://www.instagram.com/cho_hyunyoung/' },
    { dirName: 'SoUL', dbName: 'SoUL (from Seoul)' }
];

async function main() {
    console.log('Fetching latest artists.json...');
    const dbPath = path.join(__dirname, '..', 'data', 'artists.json');
    const artists = JSON.parse(fs.readFileSync(dbPath, 'utf8').replace(/^\uFEFF/, ''));
    let changed = 0;

    for (const target of targets) {
        console.log(`\nProcessing ${target.dbName}...`);
        
        const artistRecord = artists.find(a => a.name === target.dbName);
        if (!artistRecord) {
            console.error(`❌ Could not find ${target.dbName} in artists.json`);
            continue;
        }

        const localDir = path.join(__dirname, '..', 'public', 'artists', target.dirName);
        if (!fs.existsSync(localDir)) {
            console.error(`❌ Local directory not found: ${localDir}`);
            continue;
        }

        // 1. Process Photos 001-003
        const photoUrls = [];
        const thumbUrls = [];

        for (let i = 1; i <= 3; i++) {
            const fileName = `00${i}.jpg`;
            const localFilePath = path.join(localDir, fileName);
            const thumbName = `thumb-00${i}.webp`;
            const localThumbPath = path.join(localDir, thumbName);

            if (fs.existsSync(localFilePath)) {
                // Generate thumbnail
                await sharp(localFilePath)
                    .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'center' })
                    .webp({ quality: 80 })
                    .toFile(localThumbPath);
                console.log(`  ✓ Generated ${thumbName}`);

                // Upload original
                const ogBlobPath = `artists/${target.dirName.toLowerCase()}/${fileName}`;
                const ogBuffer = fs.readFileSync(localFilePath);
                const ogBlob = await put(ogBlobPath, ogBuffer, {
                    access: 'public', addRandomSuffix: false, allowOverwrite: true,
                    token: process.env.BLOB_READ_WRITE_TOKEN
                });
                photoUrls.push(ogBlob.url);
                console.log(`  ✓ Uploaded original: ${fileName} -> Blob`);

                // Upload thumbnail
                const thumbBlobPath = `artists/${target.dirName.toLowerCase()}/${thumbName}`;
                const thumbBuffer = fs.readFileSync(localThumbPath);
                const thumbBlob = await put(thumbBlobPath, thumbBuffer, {
                    access: 'public', addRandomSuffix: false, allowOverwrite: true,
                    token: process.env.BLOB_READ_WRITE_TOKEN
                });
                thumbUrls.push(thumbBlob.url);
                console.log(`  ✓ Uploaded thumbnail: ${thumbName} -> Blob`);
            } else {
                console.log(`  ⚠️ File not found: ${fileName}, skipping.`);
            }
        }

        // 2. Update DB Arrays
        if (photoUrls.length > 0) {
            artistRecord.photos = photoUrls;
            artistRecord.thumbnails = thumbUrls;
            console.log(`  ✓ Added ${photoUrls.length} photos and thumbnails to DB profile`);
        }

        // 3. Add Instagram link if provided
        if (target.instagram) {
            artistRecord.instagram = target.instagram;
            console.log(`  ✓ Attached Instagram link: ${target.instagram}`);
        }

        changed++;
    }

    if (changed > 0) {
        fs.writeFileSync(dbPath, JSON.stringify(artists, null, 2));
        console.log(`\nSaving and syncing updated DB (${changed} artists changed)...`);
        
        await put('artists.json', JSON.stringify(artists, null, 2), {
            access: 'public', addRandomSuffix: false, allowOverwrite: true,
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
        console.log('✅ Sync to Vercel Blob Complete!');
    } else {
        console.log('\nNo artists updated.');
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
