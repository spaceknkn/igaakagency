import Link from 'next/link';
import { djs } from '@/lib/data';
import { notFound } from 'next/navigation';
import DJDetailClient from './DJDetailClient';

export function generateStaticParams() {
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
    const dj = djs.find(d => d.slug === slug);

    if (!dj) {
        notFound();
    }

    return <DJDetailClient dj={dj} />;
}

