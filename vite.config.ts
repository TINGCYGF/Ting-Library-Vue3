import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 按需引入 element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// mockjs
import { viteMockServe } from 'vite-plugin-mock'
// gzip压缩
import viteCompression from 'vite-plugin-compression'
// 自动ESLint检测热更新
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig(({ command }) => {
  return {
    base: './',
    plugins: [
      vue(),
      viteCompression(),//gzip压缩
      AutoImport({resolvers: [ElementPlusResolver()],}),
      Components({resolvers: [ElementPlusResolver()],}),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 线下用mock
        prodEnabled: command !== 'serve', // 线上环境用mock
        injectCode: `
          import { setupProdMockServer } from '../mock';
          setupProdMockServer();
        `,
      }),
      // 设置eslint
    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'], // 检查的文件
    })
    ],
    resolve: {
      // 配置路径别名
      alias: {
        "@": "/src",
        "@styles": "/src/styles",
      }
    },
    build: {
      minify: 'terser', // 要配置terser压缩才有这个功能 默认es buildld
      // terserOptions: {
      //   compress: {
      //     // 生产环境移除console.log
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 其他文件进入后缀为目录名
        }
      },
    },

  }
})
