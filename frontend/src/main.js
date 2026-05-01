import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/queryClient'

const app = createApp(App)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')
