<script lang="ts" setup>
</script>
<template>
   <div v-if="podcast">
    <img
        :src="podcast.image"
        :alt="podcast.title"
        class="podcast-cover"
    />
    <div class="podcast-infos"></div>

   </div>
</template>

<style scoped>
</style>
