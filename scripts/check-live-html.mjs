async function check() {
    const res = await fetch('https://igaakagency.vercel.app/roster/ruby', { cache: 'no-store' });
    const html = await res.text();
    const count = (html.match(/001\.(jpg|jpeg|png|webp)/ig) || []).length;
    console.log(`Found ${count} occurrences of '001' images in HTML.`);
    
    // check xx as well
    const res2 = await fetch('https://igaakagency.vercel.app/roster/xx', { cache: 'no-store' });
    const html2 = await res2.text();
    const count2 = (html2.match(/001\.(jpg|jpeg|png|webp)/ig) || []).length;
    console.log(`Found ${count2} occurrences of '001' images in HTML for xx.`);
}
check().catch(console.error);
