import { list } from '@vercel/blob';

async function listMukthi() {
    try {
        const { blobs } = await list({ 
            prefix: 'artists/Mukthi/',
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
        console.log('Blobs found:', blobs.length);
        blobs.forEach(b => console.log(`- ${b.pathname} (${b.url})`));
    } catch (err) {
        console.error('Error listing blobs:', err);
    }
}

listMukthi();
