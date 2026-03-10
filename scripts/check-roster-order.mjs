async function check() {
    const res = await fetch('https://igaakagency.vercel.app/roster', { cache: 'no-store' });
    const html = await res.text();
    
    // Extract everything between <h3 class="text-black text-sm font-medium uppercase transition-colors duration-300"> and </h3>
    const matches = Array.from(html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi));
    const names = matches.map(m => m[1].trim());

    // Filter out duplicates (List view duplicates the names in the DOM sometimes depending on the client components)
    const unique = [...new Set(names)];

    const jiwooIndex = unique.findIndex(n => n.toLowerCase() === 'jiwoo');
    console.log(`Jiwoo is at position ${jiwooIndex + 1} out of ${unique.length}`);
    
    if (jiwooIndex > 0) {
        console.log(`The artist before Jiwoo is: ${unique[jiwooIndex - 1]}`);
    }
    if (jiwooIndex < unique.length - 1) {
        console.log(`The artist after Jiwoo is: ${unique[jiwooIndex + 1]}`);
    }
}
check().catch(console.error);
