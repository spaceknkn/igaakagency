const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'roster', '[slug]', 'DJDetailClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
    {
        name: 'Instagram',
        find: /className="text-neutral-400 hover:text-black transition-colors flex items-center gap-1.5">\s*<svg className="w-5 h-5"/g,
        replace: 'className="text-neutral-400 hover:text-[#E1306C] transition-colors flex items-center gap-2">\n                                        <svg className="w-7 h-7"'
    },
    {
        name: 'S2 Instagram special',
        find: /className="text-neutral-400 hover:text-black transition-colors flex items-center gap-1.5">\s*<svg className="w-5 h-5"/g, // generic catch-all
        replace: 'className="text-neutral-400 hover:text-[#E1306C] transition-colors flex items-center gap-2">\n                                        <svg className="w-7 h-7"'
    },
    {
        name: 'YouTube',
        find: /<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M23.498 6.186/g,
        replace: '<svg className="w-7 h-7 hover:text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                    <path d="M23.498 6.186'
    },
    {
        name: 'X (Twitter)',
        find: /<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M18.244 2.25/g,
        replace: '<svg className="w-7 h-7 hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                    <path d="M18.244 2.25'
    },
    {
        name: 'SoundCloud',
        find: /<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M1.175 12.225/g,
        replace: '<svg className="w-7 h-7 hover:text-[#FF3300] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                    <path d="M1.175 12.225'
    },
    {
        name: 'Spotify',
        find: /<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M12 0C5.4 0/g,
        replace: '<svg className="w-7 h-7 hover:text-[#1DB954] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                    <path d="M12 0C5.4 0'
    },
    {
        name: 'Beatport',
        find: /<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M21.092 0H2.908/g,
        replace: '<svg className="w-7 h-7 hover:text-[#02FF95] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                    <path d="M21.092 0H2.908'
    },
    {
        name: 'Facebook',
        find: /<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M24 12.073c0/g,
        replace: '<svg className="w-7 h-7 hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                    <path d="M24 12.073c0'
    },
    {
        name: 'Generic Links',
        find: /<svg className="w-5 h-5" fill="none" stroke="currentColor"/g,
        replace: '<svg className="w-7 h-7" fill="none" stroke="currentColor"'
    }
];

// Instead of granular regexes which might miss, I'll rewrite the anchor tags directly.
// This is safer.

let newContent = content.replace(/className="text-neutral-400 hover:text-black transition-colors flex items-center gap-1.5"/g, 'className="text-neutral-400 transition-colors flex items-center gap-2"');

newContent = newContent.replace(/<svg className="w-5 h-5"/g, '<svg className="w-7 h-7"');

// Now inject brand colors using standard string replace for the specific SVG paths
newContent = newContent.replace(/<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M12 2.163/g, '<svg className="w-7 h-7 hover:text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                        <path d="M12 2.163');
newContent = newContent.replace(/<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M24 12.073c0/g, '<svg className="w-7 h-7 hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                            <path d="M24 12.073c0');
newContent = newContent.replace(/<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M23.498 6.186/g, '<svg className="w-7 h-7 hover:text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                        <path d="M23.498 6.186');
newContent = newContent.replace(/<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M18.244 2.25/g, '<svg className="w-7 h-7 hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                        <path d="M18.244 2.25');
newContent = newContent.replace(/<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M1.175 12.225/g, '<svg className="w-7 h-7 hover:text-[#FF5500] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                        <path d="M1.175 12.225');
newContent = newContent.replace(/<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M12 0C5.4 0/g, '<svg className="w-7 h-7 hover:text-[#1DB954] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                        <path d="M12 0C5.4 0');
newContent = newContent.replace(/<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">\s*<path d="M21.092 0H2.908/g, '<svg className="w-7 h-7 hover:text-[#02FF95] transition-colors" fill="currentColor" viewBox="0 0 24 24">\n                                        <path d="M21.092 0H2.908');

// For custom Links
newContent = newContent.replace(/<svg className="w-7 h-7" fill="none" class="currentColor"/g, '<svg className="w-7 h-7 hover:text-[#F5A623] transition-colors" fill="none" stroke="currentColor"');

fs.writeFileSync(filePath, newContent);
console.log('Successfully updated SVG icon styling');
