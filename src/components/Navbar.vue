<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div class="container">
      <router-link class="navbar-brand fw-bold text-warning" to="/">
        <i class="bi bi-cloud-sun me-2"></i>ClimaSur
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link class="nav-link" to="/favoritos">Favoritos</router-link>
          </li>
        </ul>

        <button 
          @click="cambiarUnidad" 
          class="btn btn-sm btn-outline-warning me-3 fw-bold"
        >
          Ver en {{ usarFahrenheit ? '°C' : '°F' }}
        </button>

        <div class="d-flex align-items-center">
          <div v-if="isAuth" class="d-flex align-items-center">
            <span class="text-light me-3 small">
              Hola, <strong>{{ user?.nombre }}</strong>
            </span>
            <button @click="cerrarSesion" class="btn btn-outline-danger btn-sm">
              Salir
            </button>
          </div>
          
          <div v-else>
            <router-link to="/login" class="btn btn-warning btn-sm fw-bold">
              Ingresar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// Estados desde Vuex
const isAuth = computed(() => store.state.isAuthenticated);
const user = computed(() => store.state.usuario);
const usarFahrenheit = computed(() => store.state.usarFahrenheit);

// Función para el botón de grados
const cambiarUnidad = () => {
  store.commit('TOGGLE_UNIDAD');
};

const cerrarSesion = () => {
  store.commit('LOGOUT');
  router.push('/login');
};
</script>