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

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      podcasts: []
    }
  },
  computed: {
    latestPodcast() {
      return this.podcasts[0] || null
    }
  },
  async created() {
    try {
      const response = await fetch('podcasts.json')
      const data = await response.json()
      this.podcasts = data.podcasts
    } catch (error) {
      console.error("Erreur de chargement du fichier JSON :", error)
    }
  }
}
</script>
