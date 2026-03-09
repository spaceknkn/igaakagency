import fs from 'fs';
import path from 'path';
import { put, list, del } from '@vercel/blob';

const BLOB_FILENAME = 'artists.json';

function isVercel(): boolean {
    return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Read ── (no in-memory cache - always fetches fresh from Vercel Blob)
export async function getArtists(): Promise<any[]> {
    if (isVercel()) {
        try {
            const { blobs } = await list({ prefix: BLOB_FILENAME });
            if (blobs.length > 0) {
                const targetBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
                if (targetBlob) {
                    // Add cache-busting timestamp to bypass Vercel Blob CDN cache
                    const res = await fetch(`${targetBlob.url}?t=${Date.now()}`, { cache: 'no-store' });
                    return await res.json();
                }
            }
        } catch (e) {
            console.error('Blob read failed, falling back to JSON file:', e);
        }
    }

    // Load from local file (dev or production fallback)
    const dataPath = path.join(process.cwd(), 'data', 'artists.json');
    if (fs.existsSync(dataPath)) {
        const raw = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(raw.replace(/^\uFEFF/, ''));

        // If on Vercel and blob didn't exist, initialize it
        if (isVercel() && data.length > 0) {
            await saveToBlob(data);
        }
        return data;
    }

    return [];
}


// ── Write ──
export async function saveArtists(data: any[]): Promise<void> {
    if (isVercel()) {
        await saveToBlob(data);
    } else if (process.env.NODE_ENV !== 'production') {
        // Local dev: write to file
        const dataPath = path.join(process.cwd(), 'data', 'artists.json');
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    }
}

async function saveToBlob(data: any[]): Promise<void> {
    const json = JSON.stringify(data, null, 2);
    await put(BLOB_FILENAME, json, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
    });
}

// ── Image Upload ──
export async function uploadImage(
    buffer: Buffer,
    filename: string,
    slug: string
): Promise<string> {
    if (isVercel()) {
        // Upload to Vercel Blob
        const blobPath = `artists/${slug}/${filename}`;
        const blob = await put(blobPath, buffer, {
            access: 'public',
            addRandomSuffix: false,
            allowOverwrite: true,
        });
        return blob.url;
    } else {
        // Local dev: save to public/artists/
        if (process.env.NODE_ENV !== 'production') {
            const artistDir = path.join(process.cwd(), 'public', 'artists', slug);
            fs.mkdirSync(artistDir, { recursive: true });
            fs.writeFileSync(path.join(artistDir, filename), buffer);
        }
        return `/artists/${slug}/${filename}`;
    }
}


