import { NextResponse } from 'next/server';
import { getArtists, saveArtists } from '@/lib/db';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET all artists
export async function GET(req: Request) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    const data = await getArtists();
    return NextResponse.json(data);
}

// POST create new artist
export async function POST(req: Request) {
    const auth = verifyAuth(req);
    if (!auth.valid) return unauthorized(auth.error);

    try {
        const data = await getArtists();
        const body = await req.json();
        const maxId = Math.max(...data.map((a: any) => parseInt(a.id)), 0);

        const newArtist = {
            id: String(maxId + 1),
            name: body.name || 'New Artist',
            slug: body.slug || `artist-${maxId + 1}`,
            category: body.category || 'DJ',
            subcategory: body.subcategory || undefined,
            genre: body.genre || '',
            bio: body.bio || '',
            image: body.image || '',
            imagePosition: body.imagePosition || 'center center',
            mobileImagePosition: body.mobileImagePosition || 'center center',
            thumbnailPosition: body.thumbnailPosition || 'center center',
            weight: body.weight || 1,
            instagram: body.instagram || '',
            facebook: body.facebook || '',
            youtube: body.youtube || '',
            twitter: body.twitter || '',
            soundcloud: body.soundcloud || '',
            soundcloudEmbed: body.soundcloudEmbed || '',
            spotify: body.spotify || '',
            beatport: body.beatport || '',
            photos: body.photos || [],
            youtubeEmbed: body.youtubeEmbed || '',
            additionalLinks: body.additionalLinks || [],
        };

        data.push(newArtist);
        await saveArtists(data);
        return NextResponse.json(newArtist);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
