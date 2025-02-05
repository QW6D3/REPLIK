<template>
  <div class="wavesurfer-container" @keydown.space.prevent="handleSpaceKey" tabindex="0">
    <!-- Zone de la forme d'onde -->
    <div ref="waveformRef" class="waveform"></div>
    <!-- Contrôles audio -->
    <div class="audio-controls">
      <button class="btn-skipBackward" @click="skipBackward">
        <img src="../assets/icons/rewind_15.svg" alt="Bouton recul de 15 secondes">
      </button>
      <button class="btn-play" @click="playPause">
        <img v-if="isPlaying" src="../assets/icons/pause.svg" alt="Bouton pause" />
        <img v-else src="../assets/icons/play_arrow.svg" alt="Bouton play" />
      </button>
      <button class="btn-skipForward" @click="skipForward">
        <img src="../assets/icons/forward_15.svg" alt="Bouton avancer de 15 secondes">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import WaveSurfer from 'wavesurfer.js'

// Props du composant
const props = defineProps({
  audioUrl: {
    type: String,
    required: true
  }
})

// Références
const waveformRef = ref<HTMLElement | null>(null)
const waveSurferInstance = ref<WaveSurfer | null>(null)
const isPlaying = ref(false)

// Initialisation de WaveSurfer
const initWaveSurfer = () => {
  if (!waveformRef.value) return
  window.addEventListener('keydown', handleKeyDown)

  waveSurferInstance.value = WaveSurfer.create({
    container: waveformRef.value,
    barGap: 4,
    barRadius: 50,
    barWidth: 2,
    waveColor: 'violet',
    dragToSeek: true,
    progressColor: 'purple',
    height: 100,
    url: props.audioUrl,
  })

  // Gestion des événements
  waveSurferInstance.value.on('play', () => {
    isPlaying.value = true
  })

  waveSurferInstance.value.on('pause', () => {
    isPlaying.value = false
  })
}

// Lecture/Pause
const playPause = () => {
  if (!waveSurferInstance.value) return

  if (isPlaying.value) {
    waveSurferInstance.value.pause()
  } else {
    waveSurferInstance.value.play()
  }
}
const handleKeyDown = (event: KeyboardEvent) => {

  switch (event.code) {
    case 'Space':
      event.preventDefault()
      playPause()
      break;
    case 'ArrowLeft':
      event.preventDefault()
      skipBackward()
      break;
    case 'ArrowRight':
      event.preventDefault()
      skipForward()
      break;
    default:
  }
}

// Sauter en arrière
const skipBackward = () => {
  if (!waveSurferInstance.value) return

  const currentTime = waveSurferInstance.value.getCurrentTime()
  waveSurferInstance.value.seekTo((currentTime - 15) / waveSurferInstance.value.getDuration())
}

// Sauter en avant
const skipForward = () => {
  if (!waveSurferInstance.value) return

  const currentTime = waveSurferInstance.value.getCurrentTime()
  waveSurferInstance.value.seekTo((currentTime + 15) / waveSurferInstance.value.getDuration())
}
// Montage du composant
onMounted(() => {
  initWaveSurfer()
})

// Observer les changements d'URL
watch(() => props.audioUrl, (newUrl) => {
  if (waveSurferInstance.value) {
    waveSurferInstance.value.load(newUrl)
  }
})

// Nettoyage
onUnmounted(() => {
  if (waveSurferInstance.value) {
    waveSurferInstance.value.destroy()
  }
})
</script>

<style scoped>
/* Start - Main Container */
.wavesurfer-container {
  display: flex;
  flex-direction: row-reverse;
  gap: 30px;
  width: 90%;
  max-width: 1300px;
  justify-content: center;
  margin: auto;
}
/* End - Main Container */

/* Start - Waveform */
.waveform {
  width: 100%;
}
/* End - Waveform */

/* Start - CSS Audio Control*/
.audio-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.audio-controls button{
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 150px;
  cursor: pointer;
}
button img{
  padding-bottom: 2.5px;
  width: 20px;
}
.btn-skipBackward, .btn-skipForward{
  width: 40px;
  height: 40px;
}
.btn-play{
  width: 55px;
  height: 55px;
}
/* End - CSS Controle audio */

/* --- Responsive ---  */

/* Start - Mobile Screen */
@media screen and (max-width: 480px) {
  /* Start - Main Container */
  .wavesurfer-container{
    flex-direction: column;
  }
  /* End - Main Container */
}
/* End - Mobile Screen */

</style>
