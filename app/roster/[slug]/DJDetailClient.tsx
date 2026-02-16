'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

export default function DJDetailClient({ dj }: { dj: any }) {
    const [bioExpanded, setBioExpanded] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="relative z-10 pt-20">
                <div className="max-w-[1100px] mx-auto px-6">
                    {/* Back to Roster Link */}
                    <header className="py-4">
                        <Link
                            href="/roster"
                            className="text-[#F5A623] no-underline text-sm hover:text-[#E09515] transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Roster
                        </Link>
                    </header>

                    {/* Hero Section */}
                    <section className="relative h-[350px] overflow-hidden bg-neutral-800">
                        {dj.image ? (
                            <div
                                className="absolute inset-0 bg-cover bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${getAssetPath(encodeURI(dj.image))})`,
                                    backgroundPosition: dj.imagePosition || 'center center',
                                }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[12rem] font-bold text-neutral-700/50">{dj.name.charAt(0)}</span>
                            </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

                        {/* Hero Content */}
                        <div className="absolute inset-0 flex flex-col text-white">
                            <div className="flex-1 flex items-center justify-center">
                                <h1 className="text-4xl md:text-5xl tracking-tight font-bold drop-shadow-lg">
                                    {dj.name}
                                </h1>
                            </div>

                            <div className="flex justify-center gap-12 pb-12">
                                <div className="text-center">
                                    <div className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">LOCATION</div>
                                    <div className="text-sm text-neutral-200">Seoul, KR</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">GENRES</div>
                                    <div className="text-sm text-neutral-200">{dj.genre}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Book Now Button */}
                    <div className="flex justify-center -mt-5 relative z-10">
                        <button
                            onClick={() => setBookingOpen(true)}
                            className="bg-[#F5A623] hover:bg-[#E09515] text-black px-10 py-3 rounded-md text-sm font-bold tracking-wide uppercase transition-colors"
                        >
                            BOOK NOW
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center items-center gap-6 pt-12 pb-6 text-sm">
                        {dj.instagram && (
                            <a href={dj.instagram} target="_blank" rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-black transition-colors flex items-center gap-1.5">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                Instagram
                            </a>
                        )}
                        {dj.youtube && (
                            <a href={dj.youtube} target="_blank" rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-black transition-colors flex items-center gap-1.5">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                YouTube
                            </a>
                        )}
                        {dj.soundcloud && (
                            <a href={dj.soundcloud} target="_blank" rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-black transition-colors flex items-center gap-1.5">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.034.104-.094l.2-1.282-.2-1.332c-.014-.057-.047-.094-.104-.094m1.8-1.863c-.063 0-.104.045-.109.104l-.2 2.89.2 2.734c.005.058.046.103.108.103.061 0 .104-.045.108-.103l.227-2.734-.227-2.89c-.004-.059-.047-.104-.108-.104m.898-.06c-.062 0-.115.055-.12.115l-.176 2.962.176 2.748c.005.063.057.118.12.118.062 0 .114-.055.12-.118l.2-2.748-.2-2.962c-.006-.06-.058-.115-.12-.115m.928-.067c-.076 0-.133.06-.137.125l-.152 3.04.152 2.742c.004.067.061.127.137.127.074 0 .132-.06.136-.127l.174-2.742-.174-3.04c-.004-.065-.062-.125-.136-.125m.93-.132c-.082 0-.143.06-.148.137l-.128 3.178.128 2.727c.005.074.066.137.148.137.08 0 .142-.063.148-.137l.146-2.727-.146-3.178c-.006-.078-.068-.137-.148-.137m.953-.135c-.088 0-.155.064-.16.148l-.104 3.318.104 2.714c.005.08.072.148.16.148.087 0 .154-.068.16-.148l.118-2.714-.118-3.318c-.006-.084-.073-.148-.16-.148m.978.018c-.096 0-.168.069-.174.162l-.08 3.152.08 2.697c.006.088.078.162.174.162.094 0 .166-.074.174-.162l.09-2.697-.09-3.152c-.008-.093-.08-.162-.174-.162m.98-.172c-.102 0-.18.076-.186.176l-.058 3.348.058 2.68c.006.098.084.176.186.176.1 0 .178-.078.186-.176l.064-2.68-.064-3.348c-.008-.1-.086-.176-.186-.176m1.001-.124c-.11 0-.192.082-.197.188l-.034 3.448.034 2.667c.005.104.088.188.197.188.108 0 .19-.084.197-.188l.04-2.667-.04-3.448c-.007-.106-.09-.188-.197-.188m.989.107c-.006-.115-.098-.199-.21-.199-.111 0-.203.084-.209.2l-.024 3.34.024 2.652c.006.115.098.2.21.2.11 0 .201-.085.209-.2l.028-2.652-.028-3.34m.972-.352c-.117 0-.213.09-.218.21l-.006 3.582.006 2.637c.005.12.101.21.218.21.115 0 .211-.09.218-.21l.006-2.637-.006-3.583c-.007-.119-.103-.21-.218-.21m3.483 1.257c-.397 0-.764.097-1.09.264-.22-2.498-2.315-4.457-4.885-4.457-.566 0-1.11.1-1.614.284-.188.07-.238.14-.24.277v8.683c.002.14.113.257.252.27h7.577c1.319 0 2.388-1.072 2.388-2.393 0-1.322-1.069-2.392-2.388-2.392" />
                                </svg>
                                SoundCloud
                            </a>
                        )}
                        {dj.spotify && (
                            <a href={dj.spotify} target="_blank" rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-black transition-colors flex items-center gap-1.5">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                                Spotify
                            </a>
                        )}
                    </div>

                    {/* Bio Section */}
                    {dj.bio ? (
                        <div className="bg-white py-12 px-6 -mx-6">
                            <div className="max-w-2xl mx-auto text-center">
                                <p className={`text-neutral-800 text-base md:text-lg leading-relaxed ${!bioExpanded ? 'line-clamp-5' : ''}`}>
                                    {dj.bio}
                                </p>
                                {dj.bio.length > 200 && (
                                    <button
                                        onClick={() => setBioExpanded(!bioExpanded)}
                                        className="text-[#F5A623] hover:text-[#E09515] text-sm font-medium mt-4 transition-colors"
                                    >
                                        {bioExpanded ? 'Show Less' : 'Read Full Bio'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white py-12 px-6 -mx-6">
                            <div className="max-w-2xl mx-auto text-center">
                                <p className="text-neutral-400 text-base italic">Biography coming soon...</p>
                            </div>
                        </div>
                    )}

                    {/* Photo Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-10 mt-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative aspect-square overflow-hidden bg-neutral-200">
                                {dj.image ? (
                                    <div
                                        className="w-full h-full bg-cover bg-no-repeat"
                                        style={{
                                            backgroundImage: `url(${getAssetPath(encodeURI(dj.image))})`,
                                            backgroundPosition: dj.imagePosition || 'center center',
                                            filter: i > 1 ? `brightness(${1 - i * 0.1})` : 'none',
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-6xl font-bold text-neutral-400">{dj.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* SoundCloud Embed */}
                    {dj.soundcloudEmbed && (
                        <div className="mb-12">
                            <iframe
                                width="100%"
                                height="300"
                                scrolling="no"
                                frameBorder="no"
                                allow="autoplay"
                                src={dj.soundcloudEmbed}
                                className="rounded-lg"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                artistName={dj.name}
            />
        </div>
    );
}
