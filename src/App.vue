<template>
  <div>
    <Navbar />

    <div class="container mt-5">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue' // <-- Importamos la Navbar
</script>
