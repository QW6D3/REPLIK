<template>
    <h1>Nos podcasts</h1>
    <div class="podcast-grid">
        <div v-for="(podcast, index) in podcasts" :key="index" class="podcast-card">
            <img 
                :src="podcast.image"
                :alt="podcast.tilte"
                class="podcast-image"
                @click="goToPodcastDetail(index)"
            />
        </div>
    </div>
</template>
<script>
    import podcastData from "@/assets/podcasts.json"

    export default {
        name: "Podcast",
        data() {
            return {
                podcasts: podcastData.podcasts
            };
        },
        methods: {
            goToPodcastDetail(index){
                this.$router.push({name: 'DetailedPodcast', params: {id: index}})
            }
        }
    }
</script>
<style scoped>

</style>