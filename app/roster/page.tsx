import { getArtists } from '@/lib/db';
import RosterClient from './RosterClient';

export const revalidate = 600;

export default async function RosterPage() {
    const djs = await getArtists();
    return <RosterClient initialDjs={djs} />;
}
