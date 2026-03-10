import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const artists = [
    'Ruby', 'DJ Minky', 'X_X', 'Jiwoo', 'Cosmickey', 'miu', 'advanced', 'seorin', 'Siena'
];

async function uploadBatchAssets() {
    let count = 0;
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    for (const artist of artists) {
        const localFolder = path.join(process.cwd(), 'public', 'artists', artist);
        if (!fs.existsSync(localFolder)) {
            console.error("Folder not found:", localFolder);
            continue;
        }

        const files = fs.readdirSync(localFolder).filter(f => 
            (/^00[1-5]\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f) && !f.startsWith('000.')) || 
            f.endsWith('_thumb.webp')
        );

        for (const fileName of files) {
            const localPath = path.join(localFolder, fileName);
            const blobPath = `artists/${artist}/${fileName}`;
            
            console.log(`Uploading ${artist}/${fileName}...`);
            const fileBuffer = fs.readFileSync(localPath);
            await put(blobPath, fileBuffer, {
                access: 'public',
                addRandomSuffix: false,
                allowOverwrite: true,
                token: token
            });
            console.log(`✅ Uploaded ${blobPath}`);
            count++;
        }
    }
    console.log(`\n🎉 Total batch files uploaded: ${count}`);
}

uploadBatchAssets().catch(console.error);
