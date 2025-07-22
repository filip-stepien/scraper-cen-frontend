import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const proxyUrl = env.VITE_API_PROXY_URL;

    if (!proxyUrl) {
        throw new Error('VITE_PROXY_URL is not set.');
    }

    return {
        plugins: [tsconfigPaths(), react(), tailwindcss()],
        server: {
            proxy: {
                '/products': proxyUrl,
                '/auth': proxyUrl
            }
        }
    };
});
