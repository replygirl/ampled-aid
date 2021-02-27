import { maska } from 'maska'
import routes from 'vite-plugin-pages/client'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

createApp(App)
  .directive('mask', maska)
  .use(createRouter({
    history: createWebHistory(),
    routes
  }))
  .mount('#app')
