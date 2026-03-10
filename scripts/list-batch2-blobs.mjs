import { list } from '@vercel/blob';

async function listBatch2() {
    const artists = ['DJ Moai', 'DJ Riya', 'zb', 'Risho'];
    try {
        for (const artist of artists) {
            const { blobs } = await list({ 
                prefix: `artists/${artist}/`,
                token: process.env.BLOB_READ_WRITE_TOKEN
            });
            console.log(`\nArtist: ${artist}`);
            blobs.forEach(b => console.log(`- ${b.pathname} | ${b.url}`));
        }
    } catch (err) {
        console.error('Error listing blobs:', err);
    }
}

listBatch2();
