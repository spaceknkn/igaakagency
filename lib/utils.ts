// Base path for GitHub Pages deployment
const BASE_PATH = '/igaakagency';

// Helper function to get the correct base path for assets
export function getAssetPath(path: string): string {
    return `${BASE_PATH}${path}`;
}
