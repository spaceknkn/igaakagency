'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-bold text-white tracking-[0.2em] hover:text-neutral-300 transition-colors"
                    >
                        IGAAK
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm text-neutral-400 hover:text-white tracking-wider uppercase transition-colors duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            href="/roster"
                            className="text-sm text-neutral-400 hover:text-white tracking-wider uppercase transition-colors duration-300"
                        >
                            Roster
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm text-neutral-400 hover:text-white tracking-wider uppercase transition-colors duration-300"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-neutral-800">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="text-sm text-neutral-400 hover:text-white tracking-wider uppercase transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/roster"
                                className="text-sm text-neutral-400 hover:text-white tracking-wider uppercase transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Roster
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm text-neutral-400 hover:text-white tracking-wider uppercase transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
