import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@apis': path.resolve(__dirname, './src/apis'),
            '@app': path.resolve(__dirname, './src/app'),
            '@components': path.resolve(__dirname, './src/components'),
        }
    },
    css: {},
    server: {
        // port: 3000,
        proxy: {
            "/tenant-api": {
                target: "http://localhost:8080/",
                // target: "http://dubhe-gateway.moensun.cn/",
                changeOrigin: true,
                secure: false,
            },
            "/boss-api": {
                target: "http://localhost:8080/",
                // target: "http://dubhe-gateway.moensun.cn/",
                changeOrigin: true,
                secure: false
            },
        }
    }
})
