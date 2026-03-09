import { getArtists } from '@/lib/db';
import RosterClient from './RosterClient';

export const dynamic = 'force-dynamic';

export default async function RosterPage() {
    const djs = await getArtists();
    return <RosterClient initialDjs={djs} />;
}
