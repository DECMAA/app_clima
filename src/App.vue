<template>
  <div>
    <Navbar />

    <div class="container mt-5">
      <router-view />
    </div>
    
  </div>
</template>

<script setup>
// Si tenías importado el Navbar, suele ir aquí:
import Navbar from './components/Navbar.vue'; 
</script>