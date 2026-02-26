import artistsData from '../data/artists.json';

export interface DJ {
    id: string;
    name: string;
    slug: string;
    category: string;
    subcategory?: string;
    genre: string;
    bio: string;
    image?: string;
    imagePosition?: string;
    mobileImagePosition?: string;
    thumbnailPosition?: string;
    weight?: number;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
    soundcloud?: string;
    soundcloudEmbed?: string;
    spotify?: string;
    beatport?: string;
    photos?: string[];
    youtubeEmbed?: string;
    additionalLinks?: { label: string; url: string }[];
}

// Derive thumbnail path from the original image path
// e.g. "/artists/SoUL/000.jpg" -> "/artists/SoUL/thumb.webp"
export function getThumbnailPath(imagePath: string): string {
    const dir = imagePath.substring(0, imagePath.lastIndexOf('/'));
    return `${dir}/thumb.webp`;
}

export const djs: DJ[] = artistsData as DJ[];

export function getMainCategories(): string[] {
    return ["DJ", "Producer", "Performance"];
}

export function getGenres(): string[] {
    const genres = new Set<string>();
    djs.forEach(dj => {
        if (dj.category?.includes("DJ") && dj.genre) {
            dj.genre.split(",").forEach(g => {
                const trimmed = g.trim();
                if (trimmed) genres.add(trimmed);
            });
        }
    });
    return Array.from(genres).sort();
}

export function getPerformanceSubcategories(): string[] {
    return ["Dancer Team", "Dancer", "VJ", "Live Session"];
}

export function getDJsByFilter(category?: string, filterValue?: string): DJ[] {
    let filtered = [...djs].sort((a, b) => (b.weight || 0) - (a.weight || 0));

    if (!category) return filtered;

    let result = filtered.filter(dj => dj.category?.includes(category));

    if (filterValue) {
        if (category === "DJ") {
            result = result.filter(dj =>
                dj.genre?.split(",").map(g => g.trim()).includes(filterValue)
            );
        } else if (category === "Performance") {
            result = result.filter(dj => dj.subcategory === filterValue);
        }
    }

    return result;
}
