<template>
  <div class="container mt-5">
    
    <div v-if="ciudadEncontrada" class="card mx-auto shadow-lg mb-5" style="max-width: 500px;">
      <div class="card-body text-center">
        <h2 class="card-title fw-bold mb-4">Clima actual en {{ ciudadEncontrada.name }}</h2>
        <h1 class="display-1 text-primary fw-bold">{{ mostrarTemp(ciudadEncontrada.main.temp) }}</h1>
        <p class="lead text-capitalize">{{ ciudadEncontrada.weather[0].description }}</p>

        <ul class="list-group list-group-flush text-start mt-4">
          <li class="list-group-item"><strong>Sensación térmica:</strong> {{ mostrarTemp(ciudadEncontrada.main.feels_like) }}</li>
          <li class="list-group-item"><strong>Temp. Máxima:</strong> {{ mostrarTemp(ciudadEncontrada.main.temp_max) }}</li>
          <li class="list-group-item"><strong>Temp. Mínima:</strong> {{ mostrarTemp(ciudadEncontrada.main.temp_min) }}</li>
          <li class="list-group-item"><strong>Humedad:</strong> {{ ciudadEncontrada.main.humidity }}%</li>
        </ul>

        <div class="mt-4">
          <div v-if="ciudadEncontrada.main.temp > 25" class="alert alert-danger">
            🔥 <strong>Alerta de calor:</strong> Alta temperatura, mantente hidratado.
          </div>
          <div v-else-if="ciudadEncontrada.main.temp < 10" class="alert alert-info">
            ❄️ <strong>Alerta de frío:</strong> Bajas temperaturas, usa abrigo.
          </div>
          <div v-else class="alert alert-success">
            ✅ <strong>Clima agradable:</strong> Condiciones estables para hoy.
          </div>
        </div>

        <div v-if="estadisticas" class="alert alert-warning mt-2 mb-0">
          📊 <strong>Promedio de la semana:</strong> {{ estadisticas.promedio }}°C
          <br>
          <small>(Máxima semanal: {{ estadisticas.max }}°C | Mínima: {{ estadisticas.min }}°C)</small>
        </div>

      </div>
    </div>

    <div v-else class="text-center mb-5">
      <p class="lead">Cargando detalles de la ciudad...</p>
    </div>

    <div v-if="pronostico.length > 0">
      <h3 class="text-center fw-bold mb-4">Pronóstico para los próximos 5 días</h3>
      <div class="row">
        <div class="col-6 col-md-2 mb-3 mx-auto" v-for="(dia, index) in pronostico" :key="index">
          <div class="card text-center shadow-sm h-100">
            <div class="card-body p-2">
              <p class="fw-bold mb-1 text-capitalize">{{ formatearFecha(dia.dt_txt) }}</p>
              
              <div class="my-2">
                <i :class="['bi', obtenerIcono(dia.weather[0].icon), 'fs-1']"></i>
              </div>
              
              <h4 class="text-primary fw-bold mb-1">{{ mostrarTemp(dia.main.temp) }}</h4>
              <p class="text-muted small text-capitalize mb-0" style="font-size: 0.8rem;">{{ dia.weather[0].description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="text-center mt-5 mb-5">
      <router-link to="/" class="btn btn-secondary px-4">Volver al Inicio</router-link>
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

// 1. IMPORTAMOS TU CLASE (Cumple Requisito: POO)
import { WeatherApp } from '../services/WeatherApp'

const route = useRoute()
const store = useStore()
const nombreCiudad = route.params.ciudad

const ciudadEncontrada = computed(() => {
  return store.state.climaActual.find(ciudad => ciudad.name === nombreCiudad)
})

const pronostico = ref([])
const estadisticas = ref(null)

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

const obtenerIcono = (codigoAPI) => iconosBootstrap[codigoAPI] || 'bi-cloud-fill text-secondary'

const formatearFecha = (fechaTexto) => {
  const fecha = new Date(fechaTexto)
  const opciones = { weekday: 'short', day: 'numeric' }
  return fecha.toLocaleDateString('es-ES', opciones)
}

const mostrarTemp = (tempCelsius) => {
  if (store.state.usarFahrenheit) {
    const fahrenheit = (tempCelsius * 9/5) + 32
    return Math.round(fahrenheit) + '°F'
  }
  return Math.round(tempCelsius) + '°C'
}

onMounted(async () => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${nombreCiudad}&appid=${apiKey}&units=metric&lang=es`
    const respuesta = await axios.get(url)
    
    const pronosticoFiltrado = respuesta.data.list.filter((_, index) => index % 8 === 0)
    pronostico.value = pronosticoFiltrado

    // 2. USAMOS LA CLASE POO PARA CALCULAR ESTADÍSTICAS
    const apiClima = new WeatherApp(apiKey)
    estadisticas.value = apiClima.calcularEstadisticas(pronosticoFiltrado)

  } catch (error) {
    console.error("Error al obtener el pronóstico:", error)
  }
})
</script>