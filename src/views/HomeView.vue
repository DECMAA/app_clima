<template>

  <div>
  <div class="bg-light p-4 p-md-5 rounded-4 shadow-sm mb-5 text-center border-bottom border-warning border-4">
      <h1 class="display-5 fw-bold text-dark mb-3">
        <i class="bi bi-cloud-sun text-warning me-2"></i>Bienvenido a CliamSur
      </h1>
      <p class="lead text-muted mb-0" style="max-width: 700px; margin: 0 auto;">
        Tu portal meteorológico de confianza. Aquí podrás consultar el clima en tiempo real y el pronóstico extendido de las <strong>
        principales capitales de los paises de Latinoamérica</strong>. Utiliza nuestro buscador superior para explorar.
      </p>
    </div>
    
<template>
  <div>
    
    <div class="bg-light p-4 p-md-5 rounded-4 shadow-sm mb-5 text-center border-bottom border-warning border-4">
       </div>

    <div v-if="cargando" class="text-center">
       </div>
    
    <div v-else class="row">
       </div>

  </div>
</template>
    <h2 class="text-center mb-5 fw-bold">Clima de América del Sur</h2>

    <div v-if="cargando" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Cargando el clima...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <div v-else class="row">
      <ClimaCard 
        v-for="clima in climaActual" 
        :key="clima.id" 
        :clima="clima" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ClimaCard from '../components/ClimaCard.vue' // <-- Importamos la tarjeta

const store = useStore()

const climaActual = computed(() => store.state.climaActual)
const cargando = computed(() => store.state.cargando)
const error = computed(() => store.state.error)

onMounted(() => {
  store.dispatch('obtenerClima')
})
</script>
