<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <div class="header-container">
      <img alt="REPLIK logo" class="logo" src="../src/assets/logoReplik.png" height="100" />

      <NavBar />
    </div>
  </header>
  <body>
    <RouterView />
    <AppFooter />
  </body>
  
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  align-items: flex-end; 
  left: 0;
  width: 100%;
  z-index: 1000;
}

main {
  padding-top: 80px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin-right: 1rem;
}

.title {
  flex: 1;
}

.title h1 {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  margin-left: 2rem;
}

.nav-links a:hover {
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .header-container {
    padding: 1rem 3rem;
  }

  .title h1 {
    font-size: 2.5rem;
  }

  .nav-links a {
    font-size: 1.2rem;
    margin-left: 3rem;
  }
}
</style>
