<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header-container">
      <img alt="REPLIK logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

      <div class="title">
        <h1>REPLIK'</h1>
      </div>

      <nav class="nav-links">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/podcasts">Liste des podcasts</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #e0e0e0;
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
