'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getMainCategories, getGenres, getPerformanceSubcategories, getDJsByFilter } from '@/lib/data';

export default function RosterPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const categories = getMainCategories();
    const genres = getGenres();
    const performanceSubcategories = getPerformanceSubcategories();

    const getFilterOptions = () => {
        if (selectedCategory === 'DJ') return genres;
        if (selectedCategory === 'Performance') return performanceSubcategories;
        return [];
    };

    const filteredDJs = getDJsByFilter(selectedCategory, selectedFilter);
    const filterOptions = getFilterOptions();

    return (
        <div className="min-h-screen bg-white">
            {/* Black Hero Section */}
            <div className="bg-black pt-28 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-light text-white uppercase" style={{ letterSpacing: '0.2em' }}>
                        ROSTER
                    </h1>
                </div>
            </div>

            {/* White Content Area */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-10">

                    {/* Category Filters - Centered */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex gap-2 bg-neutral-100 p-1.5 rounded-full">
                            <button
                                onClick={() => { setSelectedCategory(''); setSelectedFilter(''); }}
                                className={`px-6 py-2 text-sm font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${selectedCategory === ''
                                    ? 'bg-black text-white shadow-md'
                                    : 'bg-transparent text-neutral-600 hover:text-black'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => { setSelectedCategory(category); setSelectedFilter(''); }}
                                    className={`px-6 py-2 text-sm font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-transparent text-neutral-600 hover:text-black'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Filter (Genre/Subcategory) */}
                    {filterOptions.length > 0 && (
                        <div className="flex justify-center mb-8">
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setSelectedFilter('')}
                                    className={`px-5 py-2 text-xs font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${selectedFilter === ''
                                        ? 'bg-black text-white shadow-sm'
                                        : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-black'
                                        }`}
                                >
                                    All
                                </button>
                                {filterOptions.map(option => (
                                    <button
                                        key={option}
                                        onClick={() => setSelectedFilter(option)}
                                        className={`px-5 py-2 text-xs font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${selectedFilter === option
                                            ? 'bg-black text-white shadow-sm'
                                            : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-black'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* View Toggle */}
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
                            aria-label="Grid view"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                <rect x="1" y="1" width="3" height="3" />
                                <rect x="6.5" y="1" width="3" height="3" />
                                <rect x="12" y="1" width="3" height="3" />
                                <rect x="1" y="6.5" width="3" height="3" />
                                <rect x="6.5" y="6.5" width="3" height="3" />
                                <rect x="12" y="6.5" width="3" height="3" />
                                <rect x="1" y="12" width="3" height="3" />
                                <rect x="6.5" y="12" width="3" height="3" />
                                <rect x="12" y="12" width="3" height="3" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 transition-colors ${viewMode === 'list' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
                            aria-label="List view"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                <rect x="0" y="1" width="16" height="2" />
                                <rect x="0" y="5.5" width="16" height="2" />
                                <rect x="0" y="10" width="16" height="2" />
                                <rect x="0" y="14" width="16" height="1" />
                            </svg>
                        </button>
                    </div>

                    {/* Results Count */}
                    <div className="text-center mb-10">
                        <p className="text-neutral-500 text-sm">
                            {filteredDJs.length} Artists
                        </p>
                    </div>

                    {/* Grid View */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {filteredDJs.map(dj => (
                                <Link
                                    key={dj.id}
                                    href={`/roster/${dj.slug}`}
                                    className="group flex flex-col items-center text-center"
                                >
                                    {/* Circular Image - Grayscale default, color on hover */}
                                    <div className="w-[80%] aspect-square rounded-full bg-neutral-200 mb-3 overflow-hidden">
                                        {dj.image ? (
                                            <div
                                                className="w-full h-full rounded-full bg-cover bg-no-repeat grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                                style={{
                                                    backgroundImage: `url(${encodeURI(dj.image)})`,
                                                    backgroundPosition: dj.thumbnailPosition || 'center center',
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-300 group-hover:bg-[#F5A623] transition-colors duration-300">
                                                <span className="text-4xl font-bold text-neutral-500 group-hover:text-white transition-colors duration-300">
                                                    {dj.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Default name (plain) - hidden on hover */}
                                    <h3 className="text-black text-sm font-semibold mb-0.5 group-hover:hidden transition-colors duration-300">
                                        {dj.name}
                                    </h3>
                                    <p className="text-neutral-500 text-xs line-clamp-1 group-hover:hidden">
                                        {dj.genre}
                                    </p>

                                    {/* Hover name (orange pill badge) - shown on hover */}
                                    <span className="hidden group-hover:inline-block bg-[#F5A623] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300">
                                        {dj.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        /* List View - 3 Column Vertical Layout */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                            {filteredDJs.map(dj => (
                                <Link
                                    key={dj.id}
                                    href={`/roster/${dj.slug}`}
                                    className="group flex items-center gap-3 py-2 transition-colors px-2"
                                >
                                    {/* Small Circle - Grayscale default */}
                                    <div className="w-12 h-12 rounded-full bg-neutral-200 flex-shrink-0 overflow-hidden">
                                        {dj.image ? (
                                            <div
                                                className="w-full h-full bg-cover bg-no-repeat grayscale group-hover:grayscale-0 transition-all duration-500"
                                                style={{
                                                    backgroundImage: `url(${encodeURI(dj.image)})`,
                                                    backgroundPosition: dj.thumbnailPosition || 'center center',
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center group-hover:bg-[#F5A623] transition-colors duration-300">
                                                <span className="text-lg font-bold text-neutral-400 group-hover:text-white transition-colors duration-300">
                                                    {dj.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Name - hidden on hover */}
                                    <div className="flex-1 min-w-0 group-hover:hidden">
                                        <h3 className="text-black text-sm font-medium uppercase transition-colors duration-300">
                                            {dj.name}
                                        </h3>
                                    </div>

                                    {/* Orange Badge - shown on hover */}
                                    <span className="hidden group-hover:inline-block bg-[#F5A623] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap">
                                        {dj.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredDJs.length === 0 && (
                        <div className="text-center py-24">
                            <p className="text-neutral-500 text-lg">
                                No artists found with the selected filters
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
