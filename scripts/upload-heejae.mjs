import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const targetArtist = 'DJ Heejae';
const targetFolderName = 'DJ Heejae';
const localFolder = path.join(process.cwd(), 'public', 'artists', targetFolderName);

async function uploadHeejaePhotos() {
    let uploadedCount = 0;
    
    if (fs.existsSync(localFolder)) {
        for (let i = 1; i <= 5; i++) {
            const fileName = `00${i}.jpg`;
            const localPath = path.join(localFolder, fileName);
            
            if (fs.existsSync(localPath)) {
                const blobPath = `artists/${targetFolderName}/${fileName}`;
                console.log(`Uploading ${localPath} straight to ${blobPath}...`);
                
                const fileBuffer = fs.readFileSync(localPath);
                await put(blobPath, fileBuffer, {
                    access: 'public',
                    addRandomSuffix: false,
                    allowOverwrite: true,
                });
                console.log(`✅ Uploaded ${blobPath}`);
                uploadedCount++;
            } else {
                console.warn(`⚠️ Warning: Local file missing -> ${localPath}`);
            }
        }
    } else {
        console.error(`❌ Error: Could not resolve local folder for ${targetArtist}`);
    }
    console.log(`\n🎉 Total photos uploaded for Heejae: ${uploadedCount}`);
}

uploadHeejaePhotos().catch(console.error);
