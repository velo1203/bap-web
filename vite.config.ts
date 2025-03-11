import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: "밥",
                short_name: "밥",
                description: "디미고밥",
                theme_color: "#F0F1F3",
                background_color: "#F0F1F3",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/apple-touch-icon.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) =>
                            request.destination === "image",
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images-cache",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: ({ request }) =>
                            request.destination === "script" ||
                            request.destination === "style",
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "assets-cache",
                        },
                    },
                ],
            },
        }),
    ],
});
