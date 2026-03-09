import { NextResponse } from 'next/server';
import { getArtists } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    const djs = await getArtists();
    
    let localData = null;
    try {
        const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'artists.json'), 'utf8');
        localData = JSON.parse(raw.replace(/^\uFEFF/, ''));
    } catch(e) {}

    const ruby = djs.find((d: any) => d.slug === 'ruby') || djs.find((d: any) => d.name === 'Ruby');
    const localRuby = localData ? localData.find((d: any) => d.slug === 'ruby') : null;

    return NextResponse.json({
        rubyFromGetArtists: ruby,
        rubyFromLocalFile: localRuby,
        vercelEnvVar: !!process.env.BLOB_READ_WRITE_TOKEN
    });
}
