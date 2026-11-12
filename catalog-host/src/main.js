import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <-- Підключаємо наш файл роутера
import './style.css'

const app = createApp(App)

app.use(router) // <-- Кажемо додатку використовувати роутер

app.mount('#app')