<template>
  <div class="container mt-5">
    <div class="card mx-auto shadow" style="max-width: 400px;">
      <div class="card-body">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        
        <form @submit.prevent="manejarLogin">
          <div class="mb-3">
            <label class="form-label">Correo Electrónico</label>
            <input 
              v-model="email" 
              type="email" 
              class="form-control" 
              placeholder="admin@climasur.com" 
              required
            >
          </div>
          
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input 
              v-model="password" 
              type="password" 
              class="form-control" 
              placeholder="Tu contraseña (123)" 
              required
            >
          </div>

          <div v-if="errorLocal" class="alert alert-danger p-2 text-center">
            {{ errorLocal }}
          </div>

          <button type="submit" class="btn btn-warning w-100 fw-bold">
            Ingresar
          </button>
        </form>
        
        <p class="text-center mt-3 text-muted small">
          Prueba con: <strong>admin@climasur.com</strong> / <strong>123</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// Variables reactivas para el formulario
const email = ref('');
const password = ref('');
const errorLocal = ref(null);

const manejarLogin = async () => {
  errorLocal.value = null;

  // Llamamos a la acción 'login' que creamos en el Store (Módulo 7)
  const exito = await store.dispatch('login', {
    email: email.value,
    password: password.value
  });

  if (exito) {
    // Si es correcto, redirigimos al Home (Requisito M7)
    router.push('/');
  } else {
    // Si falla, mostramos el error del Store
    errorLocal.value = store.state.error;
  }
};
</script>