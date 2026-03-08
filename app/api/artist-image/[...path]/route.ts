import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// Proxy route: /api/artist-image/[...path]
// Resolves /artists/slug/filename.jpg -> Vercel Blob URL
export async function GET(
    req: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        // path = ['slug', 'filename.jpg']
        const blobPath = `artists/${path.join('/')}`;

        const { blobs } = await list({ prefix: blobPath });
        const match = blobs.find(b => b.pathname === blobPath);

        if (!match) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Redirect to the actual Blob URL
        return NextResponse.redirect(match.url, { status: 302 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
