import { list, put } from '@vercel/blob';

const BLOB_FILENAME = 'artists.json';

async function renameSlug() {
    console.log('Fetching live artists.json...');
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
    if (!targetBlob) throw new Error('Live artists.json not found in Vercel Blob!');

    const res = await fetch(targetBlob.url, { cache: 'no-store' });
    const artists = await res.json();

    // Look for artist-59 or "조현영" depending on what name was saved, but slug should be artist-59
    const artist = artists.find(a => a.slug === 'artist-59' || a.name.toLowerCase().includes('hyunyoung') || a.name === '조현영');
    if (!artist) {
        console.error('❌ Could not find artist-59 in the database!');
        return;
    }

    console.log(`Found artist: ${artist.name}! Current slug: ${artist.slug}`);
    artist.slug = 'hyunyoung'; // Always use lowercase for URLs
    console.log(`Changed slug to: ${artist.slug}`);

    // Save to Vercel Blob
    const jsonString = JSON.stringify(artists, null, 2);
    await put(BLOB_FILENAME, jsonString, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
    });
    
    console.log('✅ Successfully updated live artists.json in Vercel Blob!');
}

renameSlug().catch(console.error);
