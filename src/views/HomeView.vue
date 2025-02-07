<script setup lang="ts">
import { API_URL } from '@/config';
import { ref, computed, onMounted } from 'vue'

interface Podcast {
  _id: string;
  description: string;
  cover: string;
  coverUrl: string;
  title: string;
}

const podcasts = ref<Podcast[]>([])
const latestPodcast = computed<Podcast | null>(() => podcasts.value[0] || null)

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/podcasts`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    podcasts.value = data
  } catch (error) {
    console.error("Erreur de chargement du fichier JSON :", error)
  }
})
</script>

<template>
  <main class="pageAccueil">
    <div class="lastRelease" v-if="latestPodcast">
      <div class="descPodcast">
        <h2>Dernière sortie</h2>
        <p>{{ latestPodcast.description || "Description indisponible" }}</p>
        <a :href="`/podcasts/${latestPodcast._id}`">
          <img src="../assets/playButton.png" alt="Play Button" class="playIcon">
        </a>
      </div>
      <img :src="`${API_URL}/${latestPodcast.cover}`" alt="Profil Podcast" class="profilImage">
    </div>

    <div class="listPodcast">
      <a v-for="podcast in podcasts" :key="podcast._id" :href="`/podcasts/${podcast._id}`">
        <img :src="`${API_URL}/${podcast.coverUrl}`" :alt="`Illustration de ${podcast.title}`" :width="200"
          :height="200" style="object-fit: cover; border-radius: 10px;">
      </a>
    </div>
  </main>
</template>
