import { list, put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const BLOB_FILENAME = 'artists.json';
const slugs = ['badmon', 'baeyoon', 'castle-j', 'dipcod', 'xtc-project', 'artist-58'];

async function updateArtists() {
    // 1. Fetch live production artists.json
    console.log('Fetching live artists.json...');
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
    if (!targetBlob) throw new Error('Live artists.json not found in Vercel Blob!');

    const res = await fetch(targetBlob.url, { cache: 'no-store' });
    const artists = await res.json();

    // 2. Loop through our batch slugs
    for (const slug of slugs) {
        const artist = artists.find(a => a.slug === slug);
        if (!artist) {
            console.warn(`⚠️ Artist not found for slug: ${slug}`);
            continue;
        }

        // Add socials for Badmon
        if (slug === 'badmon') {
            artist.instagram = "https://www.instagram.com/djbadmon/";
            artist.youtube = "https://www.youtube.com/@djbadmon";
            console.log(`✅ Applied Badmon Socials: Instagram & YouTube`);
        }

        // Find exact blob URLs for 001-003
        const { blobs: artistBlobs } = await list({ prefix: `artists/${slug}/` });
        const photos = artistBlobs
            .filter(b => b.pathname.match(/00[1-3]\.(jpg|jpeg|png)$/i) && !b.pathname.includes('_thumb'))
            .map(b => b.url)
            .sort(); // 001, 002, 003 alphabetical order

        if (photos.length > 0) {
            artist.photos = photos;
            console.log(`✅ Applied ${photos.length} photos for ${slug}`);
        } else {
            console.warn(`⚠️ No detail photos found in Vercel Blob for ${slug}`);
        }
    }

    // 3. Save to Vercel Blob
    const jsonString = JSON.stringify(artists, null, 2);
    await put(BLOB_FILENAME, jsonString, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
    });
    console.log('✅ Successfully updated live artists.json in Vercel Blob!');

    // 4. Save to Local Backup
    const localPath = path.join(process.cwd(), 'data', 'artists.json');
    fs.writeFileSync(localPath, jsonString, 'utf8');
    console.log('✅ Successfully updated local data/artists.json backup!');
}

updateArtists().catch(console.error);
