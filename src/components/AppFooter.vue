<script setup lang="ts">
import { API_URL } from '@/config';

function downloadFile(url: string, filename: string) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch(console.error);
}

const isSameOrigin = new URL(API_URL).origin === window.location.origin;

</script>

<template>
  <footer class="footer-container">
    <div class="content">
      <div class="logos">
        <a target=”_blank” href="https://www.instagram.com/replik_podcast/"><img src="../assets/logoInsta.png" /></a>
        <a target=”_blank” href="https://podcasts.apple.com/fr/account/settings"><img
            src="../assets/logoApple.png" /></a>
        <a target=”_blank” href="https://www.tiktok.com/@replik_podcast?lang=fr"><img
            src="../assets/logoTiktok.png" /></a>
        <a target=”_blank” href="https://www.youtube.com/@replik_podcast"><img src="../assets/logoYoutube.png" /></a>
        <a target=”_blank” href="https://www.deezer.com/fr/profile/6371062523"><img
            src="../assets/logoDeezer.png" /></a>
        <a target=”_blank” href="https://open.spotify.com/user/31u7dbcy4yhbjnv33rrhtzzhrgym?si=596f792e47564e3f"><img
            src="../assets/logoSpotify.png" /></a>
      </div>
      <nav>
        <a href="#">A Propos</a>
        <a :href="isSameOrigin ? `${API_URL}/rss` : '#'" @click="!isSameOrigin && downloadFile(`${API_URL}/rss`, 'replik_podcast.xml')">Télécharger RSS</a>
        <a href="/">Nos podcasts</a>
        <a href="#">Politique de confidentialité</a>
        <a href="contact">Contactez-nous</a>
      </nav>
      <p>&copy; REPLIK' 2024-2025</p>
    </div>
  </footer>
</template>