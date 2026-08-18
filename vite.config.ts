import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  root: resolve(__dirname, 'html-css-js-version'),
  base: '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Moe Kyaw Aung | Senior Android Developer',
        short_name: 'MoeKyawAung',
        description: 'Senior Android Engineer & Technical Founder - Building exceptional mobile experiences with Kotlin, Jetpack Compose & Modern Architecture',
        theme_color: '#1a1a2e',
        background_color: '#0f0f1a',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/assets/images/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/images/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/assets/images/icons/maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/assets/images/screenshots/desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: '/assets/images/screenshots/mobile.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ],
        categories: ['productivity', 'utilities'],
        shortcuts: [
          {
            name: 'View Projects',
            short_name: 'Projects',
            description: 'Browse all projects',
            url: '/projects',
            icons: [{ src: '/assets/images/icons/projects-icon.png', sizes: '96x96' }]
          },
          {
            name: 'Contact Me',
            short_name: 'Contact',
            description: 'Get in touch',
            url: '/contact',
            icons: [{ src: '/assets/images/icons/contact-icon.png', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          }
        ]
      }
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'html-css-js-version'),
      '@components': resolve(__dirname, 'html-css-js-version/components'),
      '@utils': resolve(__dirname, 'html-css-js-version/utils'),
      '@assets': resolve(__dirname, 'html-css-js-version/assets'),
      '@data': resolve(__dirname, 'html-css-js-version/data')
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'html-css-js-version/index.html'),
        about: resolve(__dirname, 'html-css-js-version/pages/about.html'),
        projects: resolve(__dirname, 'html-css-js-version/pages/projects.html'),
        contact: resolve(__dirname, 'html-css-js-version/pages/contact.html')
      },
      output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1);
          if (/png|jpg|jpeg|svg|webp|ico|gif/.test(extType)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff2|woff|ttf|eot/.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
      external: ['https://cdn.jsdelivr.net']
    },
    target: 'esnext',
    cssTarget: 'chrome80',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    assetsInclude: [/\/assets\//]
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    proxy: {
      '/api/github': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github/, '')
      },
      '/api/gravatar': {
        target: 'https://api.gravatar.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gravatar/, '')
      }
    }
  },
  preview: {
    port: 4173,
    host: true,
    open: true
  },
  optimizeDeps: {
    include: ['lodash-es'],
    exclude: ['@gravatar/client']
  },
  logLevel: 'info',
  clearScreen: true,
  enforcePreTransforms: true
});
