<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning shadow-sm sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold fs-4 text-dark" to="/">CliamSur</router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link active fw-bold" to="/">Inicio</router-link>
          </li>
        </ul>
        
        <form class="d-flex" @submit.prevent="realizarBusqueda">
          <input class="form-control me-2" type="search" placeholder="Buscar nueva ciudad..." v-model="busqueda">
          <button class="btn btn-dark" type="submit">Buscar</button>
        </form>

        <button 
          @click="store.commit('TOGGLE_UNIDAD')" 
          class="btn btn-outline-dark ms-lg-3 mt-2 mt-lg-0 fw-bold" 
          type="button"
        >
          {{ store.state.usarFahrenheit ? 'Ver en °C' : 'Ver en °F' }}
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const busqueda = ref('')

const realizarBusqueda = async () => {
  const ciudadEncontrada = await store.dispatch('buscarCiudad', busqueda.value)
  if (ciudadEncontrada) {
    router.push(`/detalle/${ciudadEncontrada}`)
    busqueda.value = ''
  }
}
</script>