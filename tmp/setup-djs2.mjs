import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dataPath = 'g:/Ai Ai Ai/Antigravity/igaak_new/data/artists.json';
const artistDir = 'g:/Ai Ai Ai/Antigravity/igaak_new/public/artists/djs2';

async function generateBlur(filePath) {
    const buffer = fs.readFileSync(filePath);
    const blurred = await sharp(buffer)
        .resize(10, 10, { fit: 'inside' })
        .webp({ quality: 20 })
        .toBuffer();
    return `data:image/webp;base64,${blurred.toString('base64')}`;
}

async function run() {
    console.log('Reading artists.json...');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const dj = data.find(a => a.slug === 'dj-s2');

    if (!dj) {
        console.error('DJ S2 not found in artists.json');
        return;
    }

    console.log('Generating main profile thumb and blur...');
    // Main profile thumb
    await sharp(path.join(artistDir, '000.jpg'))
        .resize(300, 300, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(path.join(artistDir, 'thumb.webp'));
    
    // Main image blur
    dj.imageBlur = await generateBlur(path.join(artistDir, '000.jpg'));

    // Thumbnails for 001-003
    dj.thumbnails = [];
    dj.photosBlur = [];

    for (let i = 1; i <= 3; i++) {
        const photoName = `00${i}.jpg`;
        const photoPath = path.join(artistDir, photoName);
        const thumbName = `thumb-00${i}.webp`;
        const thumbPath = path.join(artistDir, thumbName);

        console.log(`Generating assets for ${photoName}...`);
        // Generate thumbnail
        await sharp(photoPath)
            .resize({ width: 400, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(thumbPath);

        dj.thumbnails.push(`/artists/djs2/${thumbName}`);
        dj.photosBlur.push(await generateBlur(photoPath));
    }

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log('DJ S2 assets prepared and artists.json updated successfully.');
}

run().catch(console.error);
