import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

// Create app instance
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

// Mount app
app.mount('#app')
