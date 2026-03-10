import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Read artists data to find the exact slugs
const dataPath = path.join(rootDir, 'data', 'artists.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const artists = JSON.parse(rawData.replace(/^\uFEFF/, ''));

// Map local folder -> search keyword for finding artist in DB
const folderMap = {
    'DJ Badmon': 'badmon',
    'baeyoon': 'baeyoon',
    'Castle-J': 'castle-j',
    'Dipcod': 'dipcod',
    'XTC Project': 'xtc',
    'Hwayoung': 'hwayoung'
};

async function uploadBatch() {
    let uploads = 0;
    for (const [folder, keyword] of Object.entries(folderMap)) {
        const artistEntry = artists.find((a) => a.name.toLowerCase().includes(keyword) || a.slug.includes(keyword));
        if (!artistEntry) {
            console.error(`❌ Could not find DB entry for ${folder} using keyword ${keyword}`);
            continue;
        }

        const slug = artistEntry.slug;
        const dir = path.join(rootDir, 'public', 'artists', folder);
        
        if (!fs.existsSync(dir)) {
            console.error(`❌ Folder not found in public: ${folder}`);
            continue;
        }

        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            if (file.match(/^00[1-3](_thumb\.webp|\.jpg|\.jpeg|\.png)$/i)) {
                const localPath = path.join(dir, file);
                const blobPath = `artists/${slug}/${file}`;
                
                try {
                    const content = fs.readFileSync(localPath);
                    const { url } = await put(blobPath, content, {
                        access: 'public',
                        addRandomSuffix: false,
                        allowOverwrite: true
                    });
                    console.log(`✅ Uploaded ${file} to ${url}`);
                    uploads++;
                } catch (err) {
                    console.error(`❌ Failed to upload ${file} for ${slug}:`, err.message);
                }
            }
        }
    }
    
    console.log(`\n🎉 Process finished - Total uploaded files: ${uploads}`);
}

uploadBatch().catch(console.error);
