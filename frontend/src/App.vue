<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <body>
    <RouterView />
    <AppFooter />
  </body>
  
</template>