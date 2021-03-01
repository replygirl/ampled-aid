import Vue from '@vitejs/plugin-vue'
import path from 'path'
import type { UserConfig } from 'vite'
import Components from 'vite-plugin-components'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import Pages from 'vite-plugin-pages'

const config: UserConfig = {
  plugins: [
    Vue(),
    Pages(),
    Components({
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
        enabledCollections: ['mdi']
      })
    }),
    Icons()
  ],
  resolve: {
    alias: {
      '/@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  server: {
    proxy: {
      '/api': 'http://ampled-aid-themoon.vercel.app'
    }
  },
  build: {
    rollupOptions: {
      external: ['vue-demi']
    }
  }
}

export default config
