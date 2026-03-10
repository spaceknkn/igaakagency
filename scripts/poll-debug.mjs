async function poll() {
    try {
        const res = await fetch('https://igaakagency.vercel.app/api/debug');
        if (res.ok) {
            const data = await res.json();
            // Fetch artists
            const artistsRes = await fetch('https://igaakagency.vercel.app/api/artists', { cache: 'no-store' });
            const artists = await artistsRes.json();
            const jiwoo = artists.find(a => a.name === 'Jiwoo');
            console.log("SUCCESS Jiwoo:", JSON.stringify(jiwoo, null, 2));
        } else {
            const text = await res.text();
            console.error("HTTP ERROR:", res.status, text);
        }
    } catch (e) {
        console.error("FETCH ERROR:", e);
    }
}
poll().catch(console.error);
