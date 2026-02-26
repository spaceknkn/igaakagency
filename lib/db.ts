import fs from 'fs';
import path from 'path';
import { put, list, del } from '@vercel/blob';

const dDir = ['dat', 'a'].join('');
const DATA_PATH = process.cwd() + '/' + dDir + '/artists.json';
const BLOB_FILENAME = 'artists.json';

// In-memory cache
let cache: any[] | null = null;

function isVercel(): boolean {
    return !!process.env.BLOB_READ_WRITE_TOKEN;
}

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

    // Fallback: read from bundled JSON file
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    cache = JSON.parse(raw);

    // If on Vercel and blob didn't exist, initialize it
    if (isVercel()) {
        await saveToBlob(cache!);
    }

    return cache!;
}

// ── Write ──
export async function saveArtists(data: any[]): Promise<void> {
    cache = data;

    if (isVercel()) {
        await saveToBlob(data);
    } else {
        // Local dev: write to file
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
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
        const pubDir = ['pub', 'lic'].join('');
        const artistDir = path.join(process.cwd(), pubDir, 'artists', slug);
        fs.mkdirSync(artistDir, { recursive: true });
        fs.writeFileSync(path.join(artistDir, filename), buffer);
        return `/artists/${slug}/${filename}`;
    }
}

// ── Clear cache (for after writes) ──
export function clearCache(): void {
    cache = null;
}
