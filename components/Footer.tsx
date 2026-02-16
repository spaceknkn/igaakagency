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
                            Representing the world's leading DJs and music producers.
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
                                href="#"
                                className="text-neutral-500 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
