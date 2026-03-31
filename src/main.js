import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // Importamos nuestro cerebro (Vuex)

const app = createApp(App)

app.use(router)
app.use(store) // Le decimos a Vue que use Vuex

app.mount('#app')