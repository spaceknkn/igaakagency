import { list, put } from '@vercel/blob';

const BLOB_FILENAME = 'artists.json';

async function fix() {
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
    const res = await fetch(targetBlob.url, { cache: 'no-store' });
    const artists = await res.json();
    const artist = artists.find(a => a.slug === 'advanced');
    
    if (!artist) { console.error('NOT FOUND'); return; }
    
    console.log('BEFORE:', artist.imagePosition);
    artist.imagePosition = 'center 20%';
    console.log('AFTER:', artist.imagePosition);
    
    const jsonString = JSON.stringify(artists, null, 2);
    await put(BLOB_FILENAME, jsonString, {
        access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
    });
    
    // Update local backup too
    const fs = (await import('fs')).default;
    const path = (await import('path')).default;
    fs.writeFileSync(path.join(process.cwd(), 'data', 'artists.json'), jsonString, 'utf8');
    console.log('✅ Advanced imagePosition fixed to center 20%');
}

fix().catch(console.error);
