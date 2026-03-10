import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

async function main() {
    const dataPath = path.join(process.cwd(), 'data', 'artists.json');
    
    // 1. Read local file
    console.log('Reading local data/artists.json...');
    if (!fs.existsSync(dataPath)) {
        console.error('Error: data/artists.json not found!');
        process.exit(1);
    }
    
    const raw = fs.readFileSync(dataPath, 'utf8');
    
    // 2. Validate JSON
    let data;
    try {
        data = JSON.parse(raw.replace(/^\uFEFF/, '')); // strip BOM if present
        if (!Array.isArray(data)) {
            throw new Error('JSON root should be an array of artists');
        }
    } catch (err) {
        console.error('Error: Local artists.json is functionally invalid (Syntax Error or not an Array).');
        console.error(err.message);
        process.exit(1);
    }
    
    console.log(`Successfully parsed ${data.length} artists from local file.`);
    
    // 3. Upload to Vercel Blob
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error('Error: BLOB_READ_WRITE_TOKEN is missing in your .env.local file.');
        process.exit(1);
    }

    console.log('Uploading to Vercel production Blob storage...');
    try {
        const jsonString = JSON.stringify(data, null, 2);
        const { url } = await put('artists.json', jsonString, {
            access: 'public',
            addRandomSuffix: false, // Maintain stable database filename
            allowOverwrite: true,   // Overwrite whatever is currently there
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
        
        console.log('✅ Sync Successful!');
        console.log(`Live Database File URL: ${url}`);
        console.log('\n(Note: The live site should immediately reflect these changes upon refresh.)');
    } catch (err) {
        console.error('❌ Sync Failed - Upload Error:', err.message);
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Unexpected Script Error:', err);
    process.exit(1);
});
