import { NextResponse } from 'next/server';
import { getArtists, saveArtists, uploadImage } from '@/lib/db';
import { verifyAuth, unauthorized } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    try {
        const { id } = await params;
        const data = await getArtists();
        const artist = data.find((a: any) => a.id === id);
        if (!artist) return NextResponse.json({ error: 'Artist not found' }, { status: 404 });

        const formData = await req.formData();
        const file = formData.get('image') as File;
        if (!file) return NextResponse.json({ error: 'No image file' }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split('.').pop() || 'jpg';
        const filename = `000.${ext}`;

        const imageUrl = await uploadImage(buffer, filename, artist.slug);

        // Also generate thumbnail (only for local dev, Vercel uses blob URLs directly)
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            try {
                const sharp = (await import('sharp')).default;
                const thumbBuffer = await sharp(buffer)
                    .resize(300, 300, { fit: 'cover' })
                    .webp({ quality: 80 })
                    .toBuffer();
                await uploadImage(thumbBuffer, 'thumb.webp', artist.slug);
            } catch (e) {
                console.error('Thumbnail generation failed:', e);
            }
        }

        artist.image = imageUrl;
        await saveArtists(data);

        return NextResponse.json({ image: artist.image, message: 'Image uploaded successfully' });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
