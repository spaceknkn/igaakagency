import fs from 'fs';
import path from 'path';

// Only run this on Vercel
if (process.env.VERCEL) {
    console.log("Running Vercel cleanup script...");

    const dirsToDelete = [
        path.join(process.cwd(), '.git')
    ];

    for (const dir of dirsToDelete) {
        try {
            if (fs.existsSync(dir)) {
                fs.rmSync(dir, { recursive: true, force: true });
                console.log(`Deleted ${dir} to save bundle size.`);
            }
        } catch (e) {
            console.error(`Failed to delete ${dir}: `, e.message);
        }
    }
}
