<template>
    <div>
        <!-- Search Bar -->
        <div class="search-bar bg-white p-4 mb-8 rounded-md flex items-center relative z-10">
            <span class="material-symbols-outlined text-gray-700 font-semibold"> search </span>
            <input v-model="searchQuery" @keyup.enter="fetchPhotos" type="text" placeholder="Search for photos"
                class="w-full text-slate-700 focus:outline-none pl-8 font-semibold text-base" />
        </div>

        <!-- Photo Grid (Tailwind Grid Layout) -->
        <div class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div v-for="photo in photos" :key="photo.id" class="relative group rounded-md overflow-hidden">
                <!-- Image -->
                <img :src="photo.urls.regular" :alt="photo.alt_description"
                    class="w-full h-auto object-cover transition-transform duration-200 ease-in-out group-hover:scale-105" />

                <!-- Tint Overlay -->
                <div class="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity"></div>

                <!-- Text Overlay -->
                <div class="absolute bottom-4 left-4 text-white text-left">
                    <p class="text-sm font-semibold">{{ photo.user.name }}</p>
                    <p class="text-xs">{{ photo.location?.name || 'Unknown location' }}</p>
                </div>
            </div>
        </div>

        <!-- Loading Indicator -->
        <LoadingPlaceholder v-if="loading" />
    </div>
</template>

<script>
import axios from 'axios';
import LoadingPlaceholder from './LoadingPlaceholder.vue';

export default {
    name: 'LandingPage',
    components: {
        LoadingPlaceholder,
    },
    data() {
        return {
            searchQuery: 'People in Africa photos', // Default search query
            photos: [],
            loading: true,
        };
    },
    methods: {
        async fetchPhotos() {
            this.loading = true; // Show loading state during API call
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: this.searchQuery, // Use search query for API request
                        count: 8,
                        client_id: process.env.VUE_APP_UNSPLASH_ACCESS_KEY, // Replace with .env key
                    },
                });
                this.photos = response.data.results; // Fetch photo results
                this.loading = false;
            } catch (error) {
                console.error('Error fetching photos:', error);
                this.loading = false;
            }
        },
        clickImage(photo) {
            this.$emit('image-click', photo); // Emit click event to parent
        },
    },
    mounted() {
        this.fetchPhotos(); // Fetch initial set of photos on mount
    },
};
</script>

<style scoped>
/* No additional styles necessary, leveraging Tailwind CSS for responsiveness and layout */
</style>
