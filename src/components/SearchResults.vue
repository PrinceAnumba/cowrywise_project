<template>
    <div class="search-results">
        <div v-if="loading">
            <LoadingPlaceholder v-for="n in 8" :key="n" />
        </div>
        <div v-else class="photo-grid">
            <ImageCard v-for="photo in photos" :key="photo.id" :photo="photo" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ImageCard from './ImageCard.vue';
import LoadingPlaceholder from './LoadingPlaceholder.vue';

export default {
    name: 'SearchResults',
    components: { ImageCard, LoadingPlaceholder },
    props: ['searchQuery'],
    data() {
        return {
            photos: [],
            loading: true,
        };
    },
    watch: {
        searchQuery: 'fetchPhotos',
    },
    methods: {
        async fetchPhotos() {
            this.loading = true;
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: this.searchQuery,
                        client_id: process.env.VUE_APP_UNSPLASH_ACCESS_KEY, // Replace with your Unsplash API Key
                    },
                });
                this.photos = response.data.results;
                this.loading = false;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
}
</style>
