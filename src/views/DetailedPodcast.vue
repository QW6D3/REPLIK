<template>
   <div v-if="podcast">
    <img 
        :src="podcast.image"
        :alt="podcast.title"
        class="podcast-cover"
    />
    <div class="podcast-inofs"></div>
   </div> 
</template>
<script>

</script>
<style scoped>
</style>