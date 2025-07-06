import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react(), tailwindcss()],
    server: {
        proxy: {
            '/products': 'http://localhost:3000',
            '/auth': 'http://localhost:3000'
        }
    }
});
