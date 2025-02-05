<script setup>
import { ref, computed } from 'vue'

const podcasts = ref([])
const latestPodcast = computed(() => podcasts.value[0] || null)

async function fetchPodcasts() {
  try {
    const response = await fetch('podcasts.json')
    const data = await response.json()
    podcasts.value = data.podcasts
  } catch (error) {
    console.error("Erreur de chargement du fichier JSON :", error)
  }
}

fetchPodcasts()
</script>

<template>
  <main class="pageAccueil">
    <div class="lastRelease" v-if="latestPodcast">
      <div class="descPodcast">
        <h2>Dernière sortie</h2>
        <p>{{ latestPodcast.description || "Description indisponible" }}</p>
        <a :href="`/podcasts/${latestPodcast.id}`">
          <img src="../assets/playButton.png" alt="Play Button" class="playIcon">
        </a>
      </div>
      <img :src="latestPodcast.image" alt="Profil Podcast" class="profilImage">
    </div>

    <div class="listPodcast">
      <a v-for="podcast in podcasts" :key="podcast.id" :href="`/podcasts/${podcast.id}`">
        <img :src="podcast.image" :alt="`Illustration de ${podcast.title}`" :width="200" :height="200"
          style="object-fit: cover; border-radius: 10px;">
      </a>
    </div>
  </main>
</template>
