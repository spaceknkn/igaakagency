// Helper function to get the correct path for assets
// On Vercel, no base path needed
export function getAssetPath(path: string): string {
    return path;
}

// encodeURI that skips absolute URLs (already encoded Blob URLs etc)
export function safeEncodeURI(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return encodeURI(url);
}

