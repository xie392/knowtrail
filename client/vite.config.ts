import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }: ConfigEnv): UserConfigExport => {
    const http = loadEnv(mode, process.cwd())

    return defineConfig({
        plugins: [
            vue(),
            vueJsx(),
            AutoImport({
                resolvers: [
                    TDesignResolver({
                        library: 'vue-next'
                    })
                ]
                // imports: ['vue', 'vue-router', unheadVueComposablesImports]
                // dts: 'auto-imports.d.ts'
            }),
            Components({
                resolvers: [
                    AntDesignVueResolver({
                        importCss: false,
                        importStyle: false
                    }),
                    TDesignResolver({
                        library: 'vue-next'
                    })
                ]
            }),
            viteMockServe({
                mockPath: 'mock',
                // 如果不需要mock，可以把enable改为false
                enable: false,
                ignore: (filename: string) => filename.includes('ignore')
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                aomao: fileURLToPath(new URL('./src/aomao', import.meta.url)),
                editor: fileURLToPath(new URL('./src/editor', import.meta.url))
            }
        },
        css: {
            preprocessorOptions: {
                // 向 CSS 相关的 loader 传递选项
                less: {
                    javascriptEnabled: true
                }
            }
        }
        // server: {
        //     port: Number(http.VITE_PORT) || 3000,
        //     open: false,
        //     proxy: {
        //         '/api': {
        //             target: mode === 'development' ? http.VITE_DEV_BASE_URL : http.VITE_PRO_BASE_URL,
        //             changeOrigin: true,
        //             rewrite: (path) => path.replace(/^\/api/, '')
        //         }
        //     }
        // }
    })
}
