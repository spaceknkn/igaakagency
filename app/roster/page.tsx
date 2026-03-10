import { getArtists } from '@/lib/db';
import RosterClient from './RosterClient';

export const revalidate = 600;

export async function generateStaticParams() {
    const djs = await getArtists();
    return djs.map((dj) => ({
        slug: dj.slug,
    }));
}

export default async function DJDetailPage({
) {
    const djs = await getArtists();
    return <RosterClient initialDjs={djs} />;
}
