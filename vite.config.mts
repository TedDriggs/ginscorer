import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/ginscorer/',
    plugins: [
        VitePWA({
            manifest: {
                short_name: 'Gin Scorer',
                name: 'Gin Scorer',
                icons: [
                    {
                        src: 'logo.svg',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/svg+xml',
                    },
                ],
                start_url: './index.html',
                display: 'standalone',
                theme_color: '#00513d',
                background_color: '#000903',
            },
        }),
    ],
});
