import { NextResponse } from 'next/server';
import { getArtists, saveArtists, uploadImage } from '@/lib/db';
import { verifyAuth, unauthorized } from '@/lib/auth';

// POST: add photo
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    try {
        const { id } = await params;
        const data = await getArtists();
        const artist = data.find((a: any) => a.id === id);
        if (!artist) return NextResponse.json({ error: 'Artist not found' }, { status: 404 });

        const formData = await req.formData();
        const file = formData.get('photo') as File;
        if (!file) return NextResponse.json({ error: 'No photo file' }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split('.').pop() || 'jpg';

        if (!artist.photos) artist.photos = [];
        const photoNum = artist.photos.length + 1;
        const filename = `photo_${String(photoNum).padStart(3, '0')}.${ext}`;

        const photoUrl = await uploadImage(buffer, filename, artist.slug);
        artist.photos.push(photoUrl);
        await saveArtists(data);

        return NextResponse.json({ photos: artist.photos, message: 'Photo added successfully' });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
    }
}

// DELETE: remove photo by index (via query param)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    try {
        const { id } = await params;
        const url = new URL(req.url);
        const photoIndex = parseInt(url.searchParams.get('index') || '');

        if (isNaN(photoIndex)) return NextResponse.json({ error: 'Photo index required' }, { status: 400 });

        const data = await getArtists();
        const artist = data.find((a: any) => a.id === id);
        if (!artist) return NextResponse.json({ error: 'Artist not found' }, { status: 404 });

        if (!artist.photos || photoIndex >= artist.photos.length) {
            return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
        }

        artist.photos.splice(photoIndex, 1);
        await saveArtists(data);

        return NextResponse.json({ photos: artist.photos });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
