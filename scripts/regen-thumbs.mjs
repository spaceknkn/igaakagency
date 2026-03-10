/**
 * regen-thumbs.mjs
 * 
 * Re-generates thumb.webp files for specified artists using their
 * thumbnailPosition value from artists.json for the crop.
 * 
 * Usage: node --env-file=.env.local scripts/regen-thumbs.mjs [name1] [name2] ...
 * Example: node --env-file=.env.local scripts/regen-thumbs.mjs "Vandalrock" "SoUL" "DJ Doha"
 * 
 * If no names are given, regenerates ALL artists that have a thumbnailPosition set.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THUMB_SIZE = 300;
const THUMB_QUALITY = 80;

/**
 * Parse a CSS object-position string like "center 20%" into a 0-1 vertical ratio.
 * "center 0%" = top, "center 50%" = middle, "center 100%" = bottom
 */
function parsePosition(pos) {
    if (!pos || pos === 'center center') return 0.5;
    const parts = pos.trim().split(/\s+/);
    // Typically "center XX%" — we care about vertical (the 2nd part)
    const vertStr = parts.length >= 2 ? parts[1] : parts[0];
    if (vertStr === 'top') return 0.0;
    if (vertStr === 'center') return 0.5;
    if (vertStr === 'bottom') return 1.0;
    if (vertStr.endsWith('%')) return parseFloat(vertStr) / 100;
    return 0.5;
}

async function regenThumb(artist) {
    const { name, image, thumbnailPosition, slug } = artist;
    if (!image) {
        console.log(`⚠  ${name}: No image, skipping.`);
        return false;
    }

    const vertRatio = parsePosition(thumbnailPosition);
    console.log(`Processing ${name}: thumbnailPosition="${thumbnailPosition}" → vertRatio=${vertRatio.toFixed(2)}`);

    // If image is a Blob URL, download it
    let srcBuffer;
    if (image.startsWith('http')) {
        const res = await fetch(`${image}?t=${Date.now()}`);
        if (!res.ok) {
            console.error(`  ✗ Failed to download image for ${name}: ${res.status}`);
            return false;
        }
        srcBuffer = Buffer.from(await res.arrayBuffer());
    } else {
        // Local path
        const localPath = path.join(__dirname, '..', 'public', image);
        if (!fs.existsSync(localPath)) {
            console.error(`  ✗ Local image not found for ${name}: ${localPath}`);
            return false;
        }
        srcBuffer = fs.readFileSync(localPath);
    }

    // Get original dimensions
    const meta = await sharp(srcBuffer).metadata();
    const origW = meta.width;
    const origH = meta.height;

    // Compute crop region
    // We want a THUMB_SIZE x THUMB_SIZE square crop
    // The crop window slides vertically based on vertRatio
    const cropSize = Math.min(origW, origH, THUMB_SIZE * 2); // at least pull from a ~600px region if available
    
    // Actually for portrait photos, width is usually the shorter dimension
    const cropW = origW; // use full width
    const cropH = cropW; // square crop
    
    // Calculate top offset
    const maxTop = origH - cropH;
    const top = Math.max(0, Math.min(Math.round(maxTop * vertRatio), maxTop));
    
    console.log(`  Image: ${origW}x${origH}, Crop: ${cropW}x${cropH} from top=${top}`);

    // Generate thumb
    const thumbBuffer = await sharp(srcBuffer)
        .extract({ left: 0, top, width: cropW, height: cropH })
        .resize(THUMB_SIZE, THUMB_SIZE)
        .webp({ quality: THUMB_QUALITY })
        .toBuffer();

    // Save locally as well (for reference)
    const localArtistDir = path.join(__dirname, '..', 'public', 'artists', slug || name);
    if (fs.existsSync(localArtistDir)) {
        const thumbPath = path.join(localArtistDir, 'thumb.webp');
        fs.writeFileSync(thumbPath, thumbBuffer);
        console.log(`  ✓ Saved local: ${thumbPath}`);
    }

    // Upload to Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blobPath = `artists/${slug || name}/thumb.webp`;
        const { url } = await put(blobPath, thumbBuffer, {
            access: 'public',
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: 'image/webp',
        });
        console.log(`  ✓ Uploaded to Blob: ${url}`);
    } else {
        console.log(`  ⚠ No BLOB_READ_WRITE_TOKEN - saved locally only`);
    }

    return true;
}

async function main() {
    // Load artists.json
    const artistsPath = path.join(__dirname, '..', 'data', 'artists.json');
    if (!fs.existsSync(artistsPath)) {
        console.error('artists.json not found at', artistsPath);
        process.exit(1);
    }
    const artists = JSON.parse(fs.readFileSync(artistsPath, 'utf8').replace(/^\uFEFF/, ''));

    // Filter by names given via CLI args (case-insensitive partial match)
    const targetNames = process.argv.slice(2);
    
    let targets;
    if (targetNames.length === 0) {
        // No args: regenerate all artists that have a non-default thumbnailPosition
        targets = artists.filter(a => a.thumbnailPosition && a.thumbnailPosition !== 'center center');
        console.log(`No names specified. Regenerating ${targets.length} artists with custom thumbnailPosition...\n`);
    } else {
        targets = artists.filter(a => 
            targetNames.some(t => a.name.toLowerCase().includes(t.toLowerCase()))
        );
        console.log(`Regenerating thumbnails for: ${targets.map(a => a.name).join(', ')}\n`);
    }

    if (targets.length === 0) {
        console.log('No matching artists found.');
        process.exit(0);
    }

    let success = 0;
    for (const artist of targets) {
        const ok = await regenThumb(artist);
        if (ok) success++;
    }

    console.log(`\nDone! Regenerated ${success}/${targets.length} thumbnails.`);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
