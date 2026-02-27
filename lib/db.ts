import fs from 'fs';
import path from 'path';
import { put, list, del } from '@vercel/blob';

const BLOB_FILENAME = 'artists.json';

// In-memory cache
let cache: any[] | null = null;

function isVercel(): boolean {
    return !!process.env.BLOB_READ_WRITE_TOKEN;
}

import defaultData from '@/data/artists.json';

// ── Read ──
export async function getArtists(): Promise<any[]> {
    if (cache) return cache;

    if (isVercel()) {
        try {
            // Try to read from Vercel Blob
            const { blobs } = await list({ prefix: BLOB_FILENAME });
            if (blobs.length > 0) {
                const res = await fetch(blobs[0].url);
                cache = await res.json();
                return cache!;
            }
        } catch (e) {
            console.error('Blob read failed, falling back to JSON file:', e);
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        const dataPath = path.join(process.cwd(), 'data', 'artists.json');
        if (fs.existsSync(dataPath)) {
            const raw = fs.readFileSync(dataPath, 'utf8');
            cache = JSON.parse(raw);
        } else {
            cache = defaultData || [];
        }
    } else {
        // Fallback for production if Blob fails or is empty on first boot
        cache = defaultData || [];
    }

    // If on Vercel and blob didn't exist, initialize it
    if (isVercel() && cache!.length > 0) {
        await saveToBlob(cache!);
    }

    return cache!;
}

// ── Write ──
export async function saveArtists(data: any[]): Promise<void> {
    cache = data;

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

// ── Clear cache (for after writes) ──
export function clearCache(): void {
    cache = null;
}
