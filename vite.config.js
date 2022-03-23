import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path');
export default ({ mode }) => defineConfig({
    base: './',
    root: './src/modules/',
    publicDir: '../public',
    server: {
        host: '0.0.0.0',
        port: 9527,
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    build: {
        outDir: '../../dist',
        emptyOutDir: true,
        cssCodeSplit: false, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
        chunkSizeWarningLimit: 2000, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
        minify: 'terser', //'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
        terserOptions: {
            compress: {
                drop_console: true, // 生产环境去除console
                drop_debugger: true // 生产环境去除debugger
            }
        },
        rollupOptions: {
            input: {
                index: resolve(__dirname,'src/modules/index.html'),
                page: resolve(__dirname,'src/modules/page.html'),
            },
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: [
                    `@import "src/styles/color.less";`,
                ]
            },
        }
    },
    plugins: [
        vue()
    ],
})
