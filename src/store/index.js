import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    // --- DATOS DEL CLIMA ---
    ciudades: ['Santiago', 'Buenos Aires', 'Lima', 'Bogotá', 'Quito', 'Caracas', 'La Paz', 'Asunción', 'Montevideo', 'Brasilia'],
    climaActual: [],
    cargando: false,
    error: null,
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
    },

    // --- 🔐 ESTADO DE USUARIO (Módulo 7) ---
    usuario: null,
    isAuthenticated: false,
    usuariosDB: [
      { email: 'admin@climasur.com', password: '123', nombre: 'Admin Denisse', favoritos: [] }
    ]
  },

  mutations: {
    SET_CARGANDO(state, valor) { state.cargando = valor },
    SET_ERROR(state, mensaje) { state.error = mensaje },
    AGREGAR_CLIMA(state, datos) { state.climaActual.push(datos) },
    LIMPIAR_CLIMA(state) { state.climaActual = [] },
    TOGGLE_UNIDAD(state) { state.usarFahrenheit = !state.usarFahrenheit },
    
    // MUTACIONES AUTH
    SET_USUARIO(state, user) {
      state.usuario = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT(state) {
      state.usuario = null;
      state.isAuthenticated = false;
    }
  },

  actions: {
    // 🔐 ACCIÓN DE LOGIN
    login({ commit, state }, credenciales) {
      const userFound = state.usuariosDB.find(
        u => u.email === credenciales.email && u.password === credenciales.password
      );
      if (userFound) {
        commit('SET_USUARIO', { ...userFound });
        return true;
      } else {
        commit('SET_ERROR', 'Usuario o contraseña incorrectos');
        return false;
      }
    },

    // 🌤️ ACCIÓN OBTENER CLIMA INICIAL
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
        commit('SET_ERROR', 'Error al conectar con el servicio del clima.')
      } finally {
        commit('SET_CARGANDO', false)
      }
    },

    // 🔍 ACCIÓN BUSCAR CIUDAD (REQUISITO M6)
    async buscarCiudad({ commit, state }, ciudadBuscada) {
      if (!ciudadBuscada || ciudadBuscada.trim() === '') {
        commit('SET_ERROR', 'Escribe el nombre de una ciudad.');
        return null;
      }

      const busquedaLower = ciudadBuscada.trim().toLowerCase();
      // Verificamos si la ciudad está en nuestra lista permitida (ignorando tildes para Bogotá)
      const esCiudadPermitida = state.ciudades.find(c => 
        c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 
        busquedaLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );

      if (!esCiudadPermitida) {
        commit('SET_ERROR', 'Solo mostramos capitales de Latinoamérica.');
        return null;
      }

      // Si ya está cargada en la lista principal, devolvemos el nombre para ir al detalle
      const yaCargada = state.climaActual.find(c => c.name.toLowerCase() === esCiudadPermitida.toLowerCase());
      if (yaCargada) return yaCargada.name;

      // Si es permitida pero no está en la lista actual, la buscamos en la API
      commit('SET_CARGANDO', true);
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${esCiudadPermitida}&appid=${apiKey}&units=metric&lang=es`;
        const respuesta = await axios.get(url);
        commit('AGREGAR_CLIMA', respuesta.data);
        return respuesta.data.name;
      } catch (e) {
        commit('SET_ERROR', 'No se pudo encontrar la ciudad en el servidor.');
        return null;
      } finally {
        commit('SET_CARGANDO', false);
      }
    }
  }
})