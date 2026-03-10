async function check() {
    const root = 'https://hn5lsrd5hvli3ttm.public.blob.vercel-storage.com/artists';
    const urls = [
        `${root}/Ruby/001.jpg`,
        `${root}/Ruby/001_thumb.webp`,
        `${root}/Jiwoo/001.jpg`,
        `${root}/Jiwoo/001_thumb.webp`
    ];
    for (const url of urls) {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${res.status} HTTP for ${url}`);
    }
}
check().catch(console.error);
