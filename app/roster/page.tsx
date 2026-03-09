import { getArtists } from '@/lib/db';
import RosterClient from './RosterClient';

export default async function RosterPage() {
    const djs = await getArtists();
    return <RosterClient initialDjs={djs} />;
}
