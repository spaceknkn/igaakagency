import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const targetNames = [
    'Tricky',
    'Mukthi',
    'Magarin',
    'Youkeep',
    'nwanji',
    'Suvin',
    'pluma',
    'Xia',
    'NotXerius'
].map(n => n.toLowerCase());

const dataPath = path.join(process.cwd(), 'data', 'artists.json');
const artistsData = JSON.parse(fs.readFileSync(dataPath, 'utf8').replace(/^\uFEFF/, ''));

async function uploadDetailPhotos() {
    let uploadedCount = 0;
    
    for (const artist of artistsData) {
        const nameLower = artist.name.toLowerCase();
        const slugLower = artist.slug.toLowerCase();
        
        if (targetNames.includes(nameLower) || targetNames.includes(slugLower)) {
            // Find the local folder
            const possibleFolderNames = [artist.name, artist.slug, artist.name.replace(/\s+/g, '')];
            let localFolder = null;
            let blobFolderName = null;
            
            for (const folder of possibleFolderNames) {
                const folderPath = path.join(process.cwd(), 'public', 'artists', folder);
                if (fs.existsSync(folderPath)) {
                    localFolder = folderPath;
                    blobFolderName = folder; // Use this as the blob folder name
                    break;
                }
            }
            
            // If localFolder is still null but we know the blob URL from artists.image
            if (!localFolder && artist.image) {
                const urlObj = new URL(artist.image);
                const decodedPath = decodeURIComponent(urlObj.pathname);
                // decodedPath looks like /artists/Tricky/000.jpg
                const dirStr = path.dirname(decodedPath); // /artists/Tricky
                const dirParts = dirStr.split('/');
                const baseDirName = dirParts[dirParts.length - 1]; // "Tricky"
                localFolder = path.join(process.cwd(), 'public', 'artists', baseDirName);
                blobFolderName = baseDirName;
            }

            if (localFolder && fs.existsSync(localFolder)) {
                for (let i = 1; i <= 3; i++) {
                    const fileName = `00${i}.jpg`;
                    const localPath = path.join(localFolder, fileName);
                    
                    if (fs.existsSync(localPath)) {
                        const blobPath = `artists/${blobFolderName}/${fileName}`;
                        console.log(`Uploading ${localPath} straight to ${blobPath}...`);
                        
                        const fileBuffer = fs.readFileSync(localPath);
                        await put(blobPath, fileBuffer, {
                            access: 'public',
                            addRandomSuffix: false,
                            allowOverwrite: true, // we need this to prevent failure
                        });
                        console.log(`✅ Uploaded ${blobPath}`);
                        uploadedCount++;
                    } else {
                        console.warn(`⚠️ Warning: Local file missing -> ${localPath}`);
                    }
                }
            } else {
                console.error(`❌ Error: Could not resolve local folder for ${artist.name}`);
            }
        }
    }
    console.log(`\n🎉 Total photos uploaded: ${uploadedCount}`);
}

uploadDetailPhotos().catch(console.error);
