// Helper function to get the correct base path for assets
export function getAssetPath(path: string): string {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${basePath}${path}`;
}
