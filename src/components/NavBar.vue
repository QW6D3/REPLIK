<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="logo">
      <a href="/"><img class="logo" src="../assets/logoReplik.png" alt="Logo Replik" /></a>
    </div>
    <nav class="navbar">
      <ul>
        <li>
          <RouterLink to="/" class="nav-link" active-class="active-link">Nos podcasts</RouterLink>
        </li>
        <li>
          <RouterLink to="about" class="nav-link" active-class="active-link">À propos</RouterLink>
        </li>
        <li>
          <RouterLink to="contact" class="nav-link" active-class="active-link">Contact</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>