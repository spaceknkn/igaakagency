import { list } from '@vercel/blob';

async function fetchLiveArtists() {
    const BLOB_FILENAME = 'artists.json';
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
    if (!targetBlob) {
        console.error('Live artists.json not found!');
        return;
    }

    const res = await fetch(targetBlob.url, { cache: 'no-store' });
    const artists = await res.json();

    // Find artists with youtubeEmbeds or youtubeEmbed
    const withVideos = artists.filter(a => a.youtubeEmbed || (a.youtubeEmbeds && a.youtubeEmbeds.length > 0));
    console.log(JSON.stringify(withVideos, null, 2));
}

fetchLiveArtists().catch(console.error);
