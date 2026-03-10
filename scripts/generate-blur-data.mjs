import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dataPath = path.join(process.cwd(), 'data', 'artists.json');

async function generateBlurDataUrl(url) {
    if (!url) return null;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const blurredBuffer = await sharp(buffer)
            .resize(10, 10, { fit: 'inside' })
            .webp({ quality: 20 })
            .toBuffer();
        return `data:image/webp;base64,${blurredBuffer.toString('base64')}`;
    } catch (err) {
        console.error(`Error generating blur data for ${url}:`, err.message);
        return null;
    }
}

async function run() {
    console.log('Reading artists.json...');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let updatedCount = 0;

    for (const artist of data) {
        if (artist.image && !artist.imageBlur) {
            console.log(`Generating blur data for ${artist.name} main image...`);
            const blurUrl = await generateBlurDataUrl(artist.image);
            if (blurUrl) {
                artist.imageBlur = blurUrl;
                updatedCount++;
            }
        }

        if (artist.photos && artist.photos.length > 0) {
            if (!artist.photosBlur) artist.photosBlur = [];
            for (let i = 0; i < artist.photos.length; i++) {
                if (!artist.photosBlur[i]) {
                    console.log(`Generating blur data for ${artist.name} photo ${i + 1}...`);
                    const photoBlurUrl = await generateBlurDataUrl(artist.photos[i]);
                    artist.photosBlur[i] = photoBlurUrl || "";
                    if (photoBlurUrl) updatedCount++;
                }
            }
        }
    }

    if (updatedCount > 0) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        console.log(`Successfully updated ${updatedCount} blur data fields in artists.json`);
    } else {
        console.log('No new blur data generated. Everything is up to date.');
    }
}

run().catch(console.error);
