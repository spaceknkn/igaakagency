async function run() {
    const res = await fetch('https://igaakagency.vercel.app/api/artists');
    const artists = await res.json();
    
    if (!Array.isArray(artists)) {
        console.error('❌ API returned non-array:', artists);
        return;
    }

    const targets = ['Ruby', 'X_X(Two X)', 'Jiwoo', 'Siena'];
    let success = true;

    for (const target of targets) {
        const artist = artists.find(a => a.name === target);
        if (!artist) {
            console.error(`❌ Artist not found: ${target}`);
            success = false;
            continue;
        }
        
        const photos = artist.photos || [];
        if (photos.length >= 3 && photos.some(p => p.includes('001') || p.includes('002'))) {
            console.log(`✅ ${target} has ${photos.length} detail photos: ${photos[0]}`);
        } else {
            console.error(`❌ ${target} is missing detail photos! Found: ${photos.length}`);
            success = false;
        }
    }

    if (success) {
        console.log('\n🎉 Live site data verified successfully!');
    } else {
        console.log('\n⚠️ Some artists did not have the expected detail photos.');
    }
}
run().catch(console.error);
