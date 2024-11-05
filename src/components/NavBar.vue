<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div>
      <img class="logo" src="../assets/logo.png" alt="Logo Replik" />
    </div>
    <nav class="navbar">
      <ul>
        <li>
          <RouterLink to="/" class="nav-link" active-class="active-link">Nos podcasts</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="nav-link" active-class="active-link">À propos</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" class="nav-link" active-class="active-link">Contact</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* Aligner tout en bas */
  padding: 1rem;
  background-color: black; /* Fond noir pour l'en-tête */
  height: 80px; /* Ajustez selon la hauteur souhaitée */
}

.logo {
  height: 5px; /* Taille du logo */
}

.navbar {
  display: flex;
}

.navbar ul {
  display: flex;
  gap: 2rem; /* Espace entre les éléments */
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  position: relative;
  padding-bottom: 5px;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #00ff88; /* Couleur au survol */
}

/* Barre prononcée sous chaque lien actif */
.active-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px; /* Distance sous le texte */
  width: 100%;
  height: 4px; /* Épaisseur de la barre */
  background-color: white; /* Couleur de la barre */
  border-radius: 2px; /* Optionnel, pour arrondir légèrement */
}
</style>
