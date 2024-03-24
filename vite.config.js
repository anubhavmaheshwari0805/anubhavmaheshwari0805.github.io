import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: "./anubhavmaheshwari0805.github.io",
    plugins: [react()],
    build: {
        outDir: 'build', // Output directory where optimized files are placed
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    // Ensure JavaScript files have .js extension with correct MIME type
                    if (assetInfo.name.endsWith('.js')) {
                        return assetInfo.name;
                    }
                    return assetInfo.name;
                },
            },
        },
    },
})