import fs from 'fs';
let content = fs.readFileSync('app/roster/RosterClient.tsx', 'utf8');

// 1. Remove state and effect
content = content.replace(/const \[lastClickedDj, setLastClickedDj\] = useState<string \| null>\(null\);\n\s*/g, '');
content = content.replace(/\/\/ Load last clicked DJ from session storage on mount\n\s*useEffect\(\(\) => \{\n\s*const storedDj = sessionStorage\.getItem\('lastClickedDj'\);\n\s*if \(storedDj\) \{\n\s*setLastClickedDj\(storedDj\);\n\s*\}\n\s*\}, \[\]\);\n\s*/g, '');

// 2. Remove click handler
content = content.replace(/const handleDjClick = \(slug: string\) => \{\n\s*setLastClickedDj\(slug\);\n\s*sessionStorage\.setItem\('lastClickedDj', slug\);\n\s*\};\n\n\s*/g, '');

// 3. Remove isActive declarations
content = content.replace(/const isActive = lastClickedDj === dj\.slug;\n\s*/g, '');

// 4. Remove onClick handler from links
content = content.replace(/onClick=\{\(\) => handleDjClick\(dj\.slug\)\}\n\s*/g, '');

// 5. Replace grid classes
content = content.replace(/className=\{`object-cover transition-all duration-500 \$\{isActive \? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'\}`\}/g, 'className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"');
content = content.replace(/className=\{`w-full h-full flex items-center justify-center transition-colors duration-300 \$\{isActive \? 'bg-\[#F5A623\]' : 'bg-neutral-300 group-hover:bg-\[#F5A623\]'\}`\}/g, 'className="w-full h-full flex items-center justify-center transition-colors duration-300 bg-neutral-300 group-hover:bg-[#F5A623]"');
content = content.replace(/className=\{`text-4xl font-bold transition-colors duration-300 \$\{isActive \? 'text-white' : 'text-neutral-500 group-hover:text-white'\}`\}/g, 'className="text-4xl font-bold transition-colors duration-300 text-neutral-500 group-hover:text-white"');
content = content.replace(/className=\{`text-black text-sm font-semibold mb-0\.5 transition-colors duration-300 \$\{isActive \? 'hidden' : 'group-hover:hidden'\}`\}/g, 'className="text-black text-sm font-semibold mb-0.5 transition-colors duration-300 group-hover:hidden"');
content = content.replace(/className=\{`text-neutral-500 text-xs line-clamp-1 \$\{isActive \? 'hidden' : 'group-hover:hidden'\}`\}/g, 'className="text-neutral-500 text-xs line-clamp-1 group-hover:hidden"');
content = content.replace(/className=\{`bg-\\[#F5A623\\] text-white text-xs font-semibold px-4 py-1\\.5 rounded-full transition-all duration-300 \\$\\{isActive \\? 'inline-block' : 'hidden group-hover:inline-block'\\}`\\}/g, 'className="bg-[#F5A623] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 hidden group-hover:inline-block"');

// 6. Replace list classes
content = content.replace(/className=\{`object-cover transition-all duration-500 \$\{isActive \? 'grayscale-0' : 'grayscale group-hover:grayscale-0'\}`\}/g, 'className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0"');
content = content.replace(/className=\{`text-lg font-bold transition-colors duration-300 \$\{isActive \? 'text-white' : 'text-neutral-400 group-hover:text-white'\}`\}/g, 'className="text-lg font-bold transition-colors duration-300 text-neutral-400 group-hover:text-white"');
content = content.replace(/className=\{`flex-1 min-w-0 \$\{isActive \? 'hidden' : 'group-hover:hidden'\}`\}/g, 'className="flex-1 min-w-0 group-hover:hidden"');
content = content.replace(/className=\{`bg-\\[#F5A623\\] text-white text-xs font-semibold px-4 py-1\\.5 rounded-full transition-all duration-300 whitespace-nowrap \\$\\{isActive \\? 'inline-block' : 'hidden group-hover:inline-block'\\}`\\}/g, 'className="bg-[#F5A623] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap hidden group-hover:inline-block"');

// Fix any leftover isActive hidden texts
content = content.replace(/\{\/\* Default name \(plain\) - hidden on active\/hover \*\/\}/g, '{/* Default name (plain) - hidden on hover */}');
content = content.replace(/\{\/\* Hover name \(orange pill badge\) - shown on active\/hover \*\/\}/g, '{/* Hover name (orange pill badge) - shown on hover */}');
content = content.replace(/\{\/\* Orange Badge - shown on active\/hover \*\/\}/g, '{/* Orange Badge - shown on hover */}');
content = content.replace(/\{\/\* Name - hidden on active\/hover \*\/\}/g, '{/* Name - hidden on hover */}');

fs.writeFileSync('app/roster/RosterClient.tsx', content);
console.log('Successfully stripped active highlight logic.');
