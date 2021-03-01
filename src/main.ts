import { maska } from 'maska'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import routes from 'pages-generated'

import App from './App.vue'

createApp(App)
  .directive('mask', maska)
  .use(
    createRouter({
      history: createWebHistory(),
      routes
    })
  )
  .mount('#app')
