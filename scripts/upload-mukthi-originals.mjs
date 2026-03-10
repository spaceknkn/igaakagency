import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const targetFolderName = 'Mukthi';
const localFolder = path.join(process.cwd(), 'public', 'artists', targetFolderName);

async function uploadMukthiOriginals() {
    let uploadedCount = 0;
    
    if (fs.existsSync(localFolder)) {
        // Find files 001, 002, 003 with any extension (case insensitive)
        const files = fs.readdirSync(localFolder).filter(f => /^00[1-3]\.(jpg|jpeg|png)$/i.test(f));
        
        for (const fileName of files) {
            const localPath = path.join(localFolder, fileName);
            const blobPath = `artists/${targetFolderName}/${fileName}`;
            
            console.log(`Uploading original ${fileName} to ${blobPath}...`);
            
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
    console.log(`\n🎉 Total originals uploaded for Mukthi: ${uploadedCount}`);
}

uploadMukthiOriginals().catch(console.error);
