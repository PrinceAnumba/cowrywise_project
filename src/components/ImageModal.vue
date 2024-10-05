<template>
    <div class="landing-page ">
        <div class="grid">
            <ImageCard v-for="photo in photos" :key="photo.id" :photo="photo" @open-modal="openModal" />
        </div>

        <ImageModal v-if="selectedPhoto" :photo="selectedPhoto" @close-modal="closeModal" />

        <LoadingPlaceholder v-if="loading" />
    </div>
</template>

<script>
import ImageCard from './ImageCard.vue';
import ImageModal from './ImageModal.vue';
import LoadingPlaceholder from './LoadingPlaceholder.vue';
import axios from 'axios';

export default {
    name: 'LandingPage',
    components: { ImageCard, ImageModal, LoadingPlaceholder },
    data() {
        return {
            photos: [],
            loading: true,
            selectedPhoto: null,
        };
    },
    mounted() {
        this.fetchPhotos();
    },
    methods: {
        async fetchPhotos() {
            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: {
                        query: 'Africa',
                        count: 8,
                        client_id: process.env.VUE_APP_UNSPLASH_API_KEY,
                    },
                });
                this.photos = response.data;
                this.loading = false;
            } catch (error) {
                console.error(error);
            }
        },
        openModal(photo) {
            this.selectedPhoto = photo;
        },
        closeModal() {
            this.selectedPhoto = null;
        },
    },
};
</script>

<style scoped>
.landing-page {
    padding: 20px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 10px;
    grid-gap: 15px;
}

.grid>* {
    transition: transform 0.3s;
}

.grid>*:hover {
    transform: scale(1.03);
}
</style>
