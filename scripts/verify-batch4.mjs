async function verify() {
    const urls = [
        'badmon',
        'baeyoon',
        'castle-j',
        'dipcod',
        'xtc-project',
        'artist-58' // Hwayoung
    ];

    let allGood = true;

    for (const slug of urls) {
        const res = await fetch(`https://igaakagency.vercel.app/roster/${slug}`, { cache: 'no-store' });
        const html = await res.text();
        
        let hasPhotos = html.includes('001.jpg') || html.includes('001.JPG') || html.includes('001_thumb');
        
        console.log(`[${slug}] Photos present in HTML: ${hasPhotos ? '✅' : '❌'}`);
        if (!hasPhotos) allGood = false;

        if (slug === 'badmon') {
            const hasInsta = html.includes('instagram.com/djbadmon');
            const hasYoutube = html.includes('youtube.com/@djbadmon');
            console.log(`[${slug}] Instagram in HTML: ${hasInsta ? '✅' : '❌'}`);
            console.log(`[${slug}] YouTube in HTML: ${hasYoutube ? '✅' : '❌'}`);
            if (!hasInsta || !hasYoutube) allGood = false;
        }
    }

    if (allGood) {
        console.log('\n🎉 ALL BATCH 4 VERIFICATIONS PASSED! 🎉');
    } else {
        console.error('\n⚠️ SOME VERIFICATIONS FAILED.');
    }
}
verify().catch(console.error);
