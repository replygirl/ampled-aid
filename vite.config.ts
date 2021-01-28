import Vue from '@vitejs/plugin-vue'
import path from 'path'
import type { UserConfig } from 'vite'
import Components from 'vite-plugin-components'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import Pages from 'vite-plugin-pages'

const config: UserConfig = {
  alias: {
    '/@/': `${path.resolve(__dirname, 'src')}/`
  },
  plugins: [
    Vue(),
    Pages(),
    Components({
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
        enabledCollections: ['mdi']
      }),
    }),
    Icons()
  ]
}

export default config
