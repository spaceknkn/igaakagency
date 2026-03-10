import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const targetFolderName = 'Mukthi';
const localFolder = path.join(process.cwd(), 'public', 'artists', targetFolderName);

async function uploadMukthiThumbnails() {
    let uploadedCount = 0;
    
    if (fs.existsSync(localFolder)) {
        const thumbFiles = fs.readdirSync(localFolder).filter(f => f.endsWith('_thumb.webp'));
        
        for (const fileName of thumbFiles) {
            const localPath = path.join(localFolder, fileName);
            const blobPath = `artists/${targetFolderName}/${fileName}`;
            
            console.log(`Uploading thumbnail ${fileName} to ${blobPath}...`);
            
            const fileBuffer = fs.readFileSync(localPath);
            await put(blobPath, fileBuffer, {
                access: 'public',
                addRandomSuffix: false,
                allowOverwrite: true,
            });
            console.log(`✅ Uploaded ${blobPath}`);
            uploadedCount++;
        }
    } else {
        console.error(`❌ Error: Could not resolve local folder for ${targetFolderName}`);
    }
    console.log(`\n🎉 Total thumbnails uploaded for Mukthi: ${uploadedCount}`);
}

uploadMukthiThumbnails().catch(console.error);
