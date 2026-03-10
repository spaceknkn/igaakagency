import { list, put } from '@vercel/blob';

const BLOB_FILENAME = 'artists.json';

async function renameSlug() {
    console.log('Fetching live artists.json...');
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
    if (!targetBlob) throw new Error('Live artists.json not found in Vercel Blob!');

    const res = await fetch(targetBlob.url, { cache: 'no-store' });
    const artists = await res.json();

    const hwayoung = artists.find(a => a.name === 'Hwayoung' || a.slug === 'artist-58');
    if (!hwayoung) {
        console.error('❌ Could not find Hwayoung in the database!');
        return;
    }

    console.log(`Found Hwayoung! Current slug: ${hwayoung.slug}`);
    hwayoung.slug = 'hwayoung';
    console.log(`Changed slug to: ${hwayoung.slug}`);

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
