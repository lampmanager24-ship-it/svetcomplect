import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/category/:id', name: 'Category', component: CategoryView },
  
  // Точки
  { path: '/points/embedded', component: CategoryView, props: { categoryType: 'embedded' } },
  { path: '/points/surface', component: CategoryView, props: { categoryType: 'surface' } },
  
  // Треки 230В
  { path: '/tracks230v/rails', component: CategoryView, props: { categoryType: 'tracks230v-rails' } },
  { path: '/tracks230v/fixtures', component: CategoryView, props: { categoryType: 'tracks230v-fixtures' } },
  
  // Магнітні треки
  { path: '/magnetic/rails', component: CategoryView, props: { categoryType: 'magnetic-rails' } },
  { path: '/magnetic/fixtures', component: CategoryView, props: { categoryType: 'magnetic-fixtures' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router