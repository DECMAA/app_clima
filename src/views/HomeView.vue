<template>
  <div>
    <div class="bg-light p-4 p-md-5 rounded-4 shadow-sm mb-5 text-center border-bottom border-warning border-4">
      <h1 class="display-5 fw-bold text-dark mb-3">
        <i class="bi bi-cloud-sun text-warning me-2"></i>Bienvenido a ClimaSur
      </h1>
      <p class="lead text-muted mb-4" style="max-width: 700px; margin: 0 auto;">
        Consulta el clima en tiempo real de las principales capitales de Latinoamérica.
      </p>

      <div class="mx-auto" style="max-width: 500px;">
        <form @submit.prevent="ejecutarBusqueda" class="input-group input-group-lg">
          <input 
            v-model="textoBusqueda" 
            type="text" 
            class="form-control border-warning" 
            placeholder="Escribe una ciudad (ej: Santiago)..."
            aria-label="Buscar ciudad"
          >
          <button class="btn btn-warning fw-bold" type="submit">
            <i class="bi bi-search me-1"></i> Buscar
          </button>
        </form>
        <p v-if="error" class="text-danger mt-2 small">{{ error }}</p>
      </div>
    </div>
    
    <h2 class="text-center mb-5 fw-bold">Clima de América del Sur</h2>

    <div v-if="cargando" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Cargando el clima...</p>
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
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ClimaCard from '../components/ClimaCard.vue'

const store = useStore()
const router = useRouter()

// v-model para el buscador (Requisito M6)
const textoBusqueda = ref('')

const climaActual = computed(() => store.state.climaActual)
const cargando = computed(() => store.state.cargando)
const error = computed(() => store.state.error)

const ejecutarBusqueda = async () => {
  if (!textoBusqueda.value.trim()) return

  // Usamos la acción del store que ya configuramos
  const ciudadEncontrada = await store.dispatch('buscarCiudad', textoBusqueda.value)

  if (ciudadEncontrada) {
    // Si la encuentra, nos lleva a la vista de detalles (Ruta Dinámica M6)
    router.push(`/detalle/${ciudadEncontrada}`)
    textoBusqueda.value = ''
  }
}

onMounted(() => {
  store.dispatch('obtenerClima')
})
</script>