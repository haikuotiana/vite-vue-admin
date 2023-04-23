import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue','vue-router','pinia'], //自动引入模块
      dts: 'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less', // 一定要开启这个配置项 如果自定义主题色可以参考：https://www.jianshu.com/p/9d1df66df645
        }),
      ],
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src') // @代替src
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { // 在这里自定义主题色等样式
          // 'primary-color': '#1da57a',
          // 'link-color': '#1da57a',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
})
