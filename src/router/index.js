import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js' // 1. Importamos el store

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detalle/:ciudad',
    name: 'detalle',
    component: () => import('../views/DetalleView.vue')
  },
  {
    path: '/login', // 2. Ruta para el login
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/favoritos', // 3. Ruta protegida
    name: 'favoritos',
    component: HomeView, 
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 🛡️ Guardia de navegación
router.beforeEach((to, from, next) => {
  const isAuth = store.state.isAuthenticated;

  if (to.meta.requiresAuth && !isAuth) {
    alert("Acceso restringido. Por favor, inicia sesión.");
    next('/login'); 
  } else {
    next(); 
  }
})

export default router