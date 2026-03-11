import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative z-10 bg-black border-t border-neutral-800 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Column 1: Brand */}
                    <div>
                        <Link href="/" className="text-2xl font-bold text-white tracking-[0.2em]">
                            IGAAK
                        </Link>
                        <p className="mt-4 text-neutral-500 text-sm leading-relaxed">
                            Beyond the Glare, Into the Sound.<br />
                            Korea&apos;s premier DJ agency.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                            Navigation
                        </h4>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="text-neutral-500 hover:text-white text-sm transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/roster"
                                className="text-neutral-500 hover:text-white text-sm transition-colors"
                            >
                                Roster
                            </Link>
                            <Link
                                href="/contact"
                                className="text-neutral-500 hover:text-white text-sm transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Social */}
                    <div>
                        <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                            Follow Us
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/igaakagency/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-500 hover:text-[#E1306C] transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://wa.me/message/WLHQVP4M627VF1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-500 hover:text-[#25D366] transition-colors"
                                aria-label="WhatsApp"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-2.01-.001-3.987-.51-5.741-1.477l-6.255 1.685zm6.106-4.315c1.7.994 3.444 1.488 5.265 1.488 5.488 0 9.954-4.464 9.956-9.953.001-2.659-1.034-5.158-2.914-7.038s-4.381-2.912-7.042-2.913c-5.489 0-9.953 4.464-9.956 9.953-.001 1.932.551 3.82 1.597 5.462l-1.082 3.951 4.176-1.12zm11.238-7.3c-.309-.155-1.832-.904-2.112-1.005-.28-.103-.485-.155-.688.155-.203.312-.787 1.005-.965 1.21-.177.205-.354.23-.663.076-.309-.155-1.305-.482-2.486-1.54-.919-.821-1.54-1.836-1.719-2.146-.179-.31-.02-.477.136-.631.139-.139.309-.36.463-.541.155-.181.206-.31.309-.516.103-.207.051-.387-.026-.541s-.688-1.662-.942-2.27c-.247-.591-.497-.509-.688-.519-.177-.01-.38-.012-.582-.012s-.532.076-.811.387c-.28.31-1.066 1.045-1.066 2.549s1.092 2.957 1.244 3.163c.152.207 2.15 3.28 5.208 4.604.728.315 1.296.502 1.74.644.731.233 1.396.199 1.921.121.586-.088 1.832-.751 2.088-1.477.252-.726.252-1.348.177-1.477-.076-.13-.28-.207-.589-.363z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:igaakagency@gmail.com"
                                className="text-neutral-500 hover:text-white transition-colors"
                                aria-label="Email"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-neutral-800 text-center">
                    <p className="text-neutral-600 text-sm">
                        © {new Date().getFullYear()} IGAAK. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
