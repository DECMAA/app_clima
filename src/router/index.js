import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetalleView from '../views/DetalleView.vue' // <-- Importamos la nueva vista

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detalle/:ciudad', // <-- Los dos puntos (:) indican que "ciudad" es un parámetro dinámico
      name: 'detalle',
      component: DetalleView
    }
  ]
})

export default router