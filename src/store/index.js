import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    ciudades: ['Santiago', 'Buenos Aires', 'Lima', 'Bogotá', 'Quito', 'Caracas', 'La Paz', 'Asunción', 'Montevideo', 'Brasilia'],
    climaActual: [],
    cargando: false,
    error: null,
    // --- NUEVA PREFERENCIA BÁSICA ---
    usarFahrenheit: false, 
    fotosCiudades: {
      'Santiago': '/santiago.jpg', 
      'Buenos Aires': '/buenos_aires.jpg',
      'Lima': '/lima.jpg',
      'Bogota': '/bogota.jpg',
      'Quito': '/quito.jpg',
      'Caracas': '/caracas.jpg',
      'La Paz': '/la_paz.jpg',
      'Asunción': '/asuncion.jpg',
      'Montevideo': '/montevideo.jpg',
      'Brasília': '/brasilia.jpg'
    }
  },
  mutations: {
    SET_CARGANDO(state, valor) { state.cargando = valor },
    SET_ERROR(state, mensaje) { state.error = mensaje },
    AGREGAR_CLIMA(state, datos) { state.climaActual.push(datos) },
    LIMPIAR_CLIMA(state) { state.climaActual = [] },
    // --- NUEVO INTERRUPTOR ---
    TOGGLE_UNIDAD(state) { state.usarFahrenheit = !state.usarFahrenheit }
  },
  actions: {
    async obtenerClima({ commit, state }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      commit('LIMPIAR_CLIMA')
      const apiKey = import.meta.env.VITE_API_KEY
      try {
        for (let ciudad of state.ciudades) {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
          const respuesta = await axios.get(url)
          commit('AGREGAR_CLIMA', respuesta.data)
        }
      } catch (error) {
        console.error(error)
        commit('SET_ERROR', 'Hubo un problema al obtener los datos del clima.')
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
    
    async buscarCiudad({ commit, state }, ciudadBuscada) {
      if (!ciudadBuscada || ciudadBuscada.trim() === '') {
        commit('SET_ERROR', 'El formulario de búsqueda no puede estar vacío.')
        return null 
      }
      const busquedaLower = ciudadBuscada.trim().toLowerCase()
      const esCiudadPermitida = state.ciudades.find(c => c.toLowerCase() === busquedaLower)

      if (!esCiudadPermitida) {
        commit('SET_ERROR', 'Lo siento, esta página solo busca información de las principales ciudades de los países de Latinoamérica.')
        return null
      }

      const ciudadYaCargada = state.climaActual.find(c => c.name.toLowerCase() === busquedaLower || c.name.toLowerCase() === esCiudadPermitida.toLowerCase())
      if (ciudadYaCargada) {
         commit('SET_ERROR', null)
         return ciudadYaCargada.name
      }

      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      const apiKey = import.meta.env.VITE_API_KEY
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${esCiudadPermitida}&appid=${apiKey}&units=metric&lang=es`
        const respuesta = await axios.get(url)
        commit('AGREGAR_CLIMA', respuesta.data)
        return respuesta.data.name
      } catch (error) {
        console.error(error)
        commit('SET_ERROR', `No pudimos conectar con el servidor para buscar la ciudad.`)
        return null
      } finally {
        commit('SET_CARGANDO', false)
      }
    }
  }
})