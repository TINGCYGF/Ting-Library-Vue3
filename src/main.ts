import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupGlobDirectives } from '@/directives'

import 'virtual:svg-icons-register'
import '@s/index.scss'
import 'uno.css'
async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  setupGlobDirectives(app)
  app.mount('#app')
}

bootstrap()
