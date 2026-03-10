import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const artists = ['nwanji', 'pluma'];

async function uploadFiles() {
    let count = 0;
    for (const artist of artists) {
        const localFolder = path.join(process.cwd(), 'public', 'artists', artist);
        if (!fs.existsSync(localFolder)) continue;

        const files = fs.readdirSync(localFolder).filter(f => 
            /^00[1-3]\.jpg$/i.test(f) || f.endsWith('_thumb.webp')
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
                token: process.env.BLOB_READ_WRITE_TOKEN
            });
            console.log(`✅ Uploaded ${blobPath}`);
            count++;
        }
    }
    console.log(`\n🎉 Total files uploaded: ${count}`);
}

uploadFiles().catch(console.error);
