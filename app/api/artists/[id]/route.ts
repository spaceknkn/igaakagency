import { NextResponse } from 'next/server';
import { getArtists, saveArtists } from '@/lib/db';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET single artist
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    const { id } = await params;
    const data = await getArtists();
    const artist = data.find((a: any) => a.id === id);
    if (!artist) return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    return NextResponse.json(artist);
}

// PUT update artist
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    try {
        const { id } = await params;
        const data = await getArtists();
        const idx = data.findIndex((a: any) => a.id === id);
        if (idx === -1) return NextResponse.json({ error: 'Artist not found' }, { status: 404 });

        const body = await req.json();
        data[idx] = { ...data[idx], ...body };
        await saveArtists(data);
        return NextResponse.json(data[idx]);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// DELETE artist
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    try {
        const { id } = await params;
        const data = await getArtists();
        const idx = data.findIndex((a: any) => a.id === id);
        if (idx === -1) return NextResponse.json({ error: 'Artist not found' }, { status: 404 });

        const removed = data.splice(idx, 1);
        await saveArtists(data);
        return NextResponse.json({ deleted: removed[0] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
