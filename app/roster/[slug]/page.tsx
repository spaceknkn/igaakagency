import { getArtists } from '@/lib/db';
import { notFound } from 'next/navigation';
import DJDetailClient from './DJDetailClient';

export const revalidate = 600;

export async function generateStaticParams() {
    const djs = await getArtists();
    return djs.map((dj) => ({
        slug: dj.slug,
    }));
}

export default async function DJDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const djs = await getArtists();
    const dj = djs.find(d => d.slug === slug);

    if (!dj) {
        notFound();
    }

    return <DJDetailClient dj={dj} />;
}
