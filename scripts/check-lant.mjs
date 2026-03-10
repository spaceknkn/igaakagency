import { list } from '@vercel/blob';

const BLOB_FILENAME = 'artists.json';

async function check() {
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
    // Use cache-busting to get fresh data
    const res = await fetch(`${targetBlob.url}?t=${Date.now()}`, { cache: 'no-store' });
    const artists = await res.json();
    
    // Check Erry
    const erry = artists.find(a => a.name.toLowerCase().includes('erry') || a.slug.includes('erry'));
    if (erry) {
        console.log('DJ Erry:');
        console.log('  slug:', erry.slug);
        console.log('  imagePosition:', erry.imagePosition);
        console.log('  mobileImagePosition:', erry.mobileImagePosition);
        console.log('  thumbnailPosition:', erry.thumbnailPosition);
        console.log('  photos:', erry.photos);
    } else {
        // Try to find by listing all slugs
        console.log('Erry not found. All artists with "dj" in name:');
        artists.filter(a => a.name.toLowerCase().startsWith('dj')).forEach(a => {
            console.log(`  ${a.name} -> ${a.slug}`);
        });
    }
}

check().catch(console.error);
