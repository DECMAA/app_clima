<template>
  <div class="col-md-4 mb-4">
    <div class="card shadow-sm h-100 overflow-hidden">
      <img :src="imagenCiudad" class="card-img-top" alt="Foto de la ciudad" style="height: 200px; object-fit: cover;">
      
      <div class="card-body text-center">
        <h5 class="card-title fw-bold">{{ clima.name }}</h5>
        
        <h2 class="display-5 text-primary mb-1">{{ mostrarTemp(clima.main.temp) }}</h2>
        
        <div class="mb-2">
          <i :class="['bi', iconoClima, 'display-6']"></i>
        </div>
        
        <p class="text-capitalize text-muted">{{ clima.weather[0].description }}</p>
        
        <router-link :to="`/detalle/${clima.name}`" class="btn btn-outline-primary w-100">
          Ver Detalles
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  clima: { type: Object, required: true }
})

const store = useStore()

const imagenCiudad = computed(() => store.state.fotosCiudades[props.clima.name])

const iconosBootstrap = {
  '01d': 'bi-sun-fill text-warning', '01n': 'bi-moon-stars-fill text-secondary',
  '02d': 'bi-cloud-sun-fill text-warning', '02n': 'bi-cloud-moon-fill text-secondary',
  '03d': 'bi-cloud-fill text-secondary', '03n': 'bi-cloud-fill text-secondary',
  '04d': 'bi-clouds-fill text-secondary', '04n': 'bi-clouds-fill text-secondary',
  '09d': 'bi-cloud-rain-heavy-fill text-info', '09n': 'bi-cloud-rain-heavy-fill text-info',
  '10d': 'bi-cloud-drizzle-fill text-info', '10n': 'bi-cloud-drizzle-fill text-info',
  '11d': 'bi-cloud-lightning-rain-fill text-warning', '11n': 'bi-cloud-lightning-rain-fill text-warning',
  '13d': 'bi-snow text-info', '13n': 'bi-snow text-info',
  '50d': 'bi-cloud-haze2 text-secondary', '50n': 'bi-cloud-haze2 text-secondary'
}

const iconoClima = computed(() => iconosBootstrap[props.clima.weather[0].icon] || 'bi-cloud-fill text-secondary')

// --- NUEVA FUNCIÓN MATEMÁTICA ---
const mostrarTemp = (tempCelsius) => {
  if (store.state.usarFahrenheit) {
    const fahrenheit = (tempCelsius * 9/5) + 32
    return Math.round(fahrenheit) + '°F'
  }
  return Math.round(tempCelsius) + '°C'
}
</script>