<script lang="ts" setup>
import AudioPlayer from "../components/AudioPlayer.vue";
import { useRoute } from "vue-router";
import podcastData from "../../../podcasts.json";

const route = useRoute();
const podcastId = route.params.idPodcast;
const podcast = podcastData.podcasts.find((podcast) => podcast.id == podcastId)
</script>
<template>
  <div v-if="podcast" class="podcast">
    <div class="podcast-infos">
      <div class="podcast-text">
        <h1>Episode : {{ podcast.id }}</h1>
        <h2>{{ podcast.title }}</h2>
        <p>Guests: {{ podcast.guests.join(", ") }}</p>
        <p>{{ podcast.description }}</p>
      </div>
      <div class="podcast-img">
        <img :src="`../${podcast.image}`" :alt="podcast.title" />
      </div>
    </div>
    <AudioPlayer :audioUrl="`/src/assets/audio/${podcast.mp3_metadata.file_name}`" />
  </div>

  <div v-else class="podcast">
    <p>Podcast not found</p>
  </div>
</template>

<style scoped>
/* Start -  Général*/
.podcast {
  /* -- Mettre la font dans ce selecteur CSS --*/
  /*               font-family: ;              */
  /* ----------------------------------------- */
  margin-top: 60px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
/* End -  Général*/
/* Start -  podcast infos (text + img)*/
.podcast-infos{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
  max-width: 1300px;
}
/* End -  podcast infos (text + img)*/
/* Start -  podcast infos detailed*/
.podcast-text{
  width: 50%;
  padding-right: 15px;
}
.podcast-text h1 {
  display: flex;
  justify-content: start;
}
.podcast-img img{
  width: 275px;
  border-radius: 15px;
}
/* End -  podcast infos detailed*/

/* --- Responsive ---  */

/* Start - Mobile Screen */
@media screen and (max-width: 480px) {
  /* Start - Podcast container */
  .podcast-infos{
    flex-direction: column-reverse;
  }
  /* End - Podcast container */
  /* Start - podcast infos (text + img) */
  .podcast-infos > div{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .podcast-text{
    padding-right: 0;
  }
  /* End - podcast infos (text + img) */
}
/* End - Mobile Screen */

</style>
