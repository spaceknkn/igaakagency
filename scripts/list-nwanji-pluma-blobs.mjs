import { list } from '@vercel/blob';

async function listArtists() {
    const artists = ['nwanji', 'pluma'];
    try {
        for (const artist of artists) {
            const { blobs } = await list({ 
                prefix: `artists/${artist}/`,
                token: process.env.BLOB_READ_WRITE_TOKEN
            });
            console.log(`\nArtist: ${artist}`);
            console.log('Blobs found:', blobs.length);
            blobs.forEach(b => console.log(`- ${b.pathname}`));
        }
    } catch (err) {
        console.error('Error listing blobs:', err);
    }
}

listArtists();
