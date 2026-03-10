import { list } from '@vercel/blob';

async function check() {
    const { blobs } = await list({ prefix: 'artists.json' });
    console.log(`Found ${blobs.length} blobs starting with artists.json`);
    
    if(blobs.length > 0) {
        // Find the exact artists.json
        const target = blobs.find(b => b.pathname === 'artists.json');
        if (!target) {
            console.log('Exact artists.json not found in blob list.');
            return;
        }

        console.log(`Fetching from: ${target.url}`);
        const res = await fetch(target.url, { cache: 'no-store' });
        const data = await res.json();
        
        const ruby = data.find(a => a.name === 'Ruby');
        const jiwoo = data.find(a => a.name === 'Jiwoo');
        
        console.log("Ruby photos:", ruby?.photos);
        console.log("Jiwoo photos:", jiwoo?.photos);
    }
}
check().catch(console.error);
