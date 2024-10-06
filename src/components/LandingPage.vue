<template>
    <div class="w-full px-6">
        <!-- Centered Search Bar -->
        <div
            class="search-bar bg-white shadow-lg p-4 mb-8 rounded-lg flex items-center relative z-10 mx-auto max-w-4xl">
            <span class="material-symbols-outlined text-gray-400 font-semibold">search</span>
            <input v-model="searchQuery" @keyup.enter="fetchPhotos" type="text" placeholder="Search for photo"
                class="w-full text-gray-700 focus:outline-none pl-4 font-semibold text-base placeholder-gray-400" />
        </div>

        <!-- Photo Grid (Tailwind Grid Layout) -->
        <div ref="masonryGrid" class="grid-container">
            <div v-for="photo in photos" :key="photo.id" class="relative group rounded-lg overflow-hidden masonry-item">
                <!-- Image -->
                <img :src="photo.urls.regular" :alt="photo.alt_description"
                    class="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />

                <!-- Tint Overlay -->
                <div class="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity"></div>

                <!-- Text Overlay with Dark Background (Matching the Image) -->
                <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t flex flex-col items-start  from-black to-transparent p-4">
                    <p class="text-base font-semibold text-white">{{ photo.user.name }}</p>
                    <p class="text-xs text-gray-300">{{ photo.location?.name || 'Unknown location' }}</p>
                </div>
            </div>
        </div>

        <!-- Loading Indicator -->
        <LoadingPlaceholder v-if="loading" />
    </div>
</template>

<script>
import axios from 'axios';
import Masonry from 'masonry-layout';
import LoadingPlaceholder from './LoadingPlaceholder.vue';

export default {
    name: 'MasonryLayout',
    components: {
        LoadingPlaceholder,
    },
    data() {
        return {
            searchQuery: 'Africans', // Default search query
            photos: [],
            loading: true,
            masonry: null, // For the Masonry instance
        };
    },
    methods: {
        async fetchPhotos() {
            this.loading = true;
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: this.searchQuery,
                        per_page: 15, // Number of images
                        client_id: process.env.VUE_APP_UNSPLASH_ACCESS_KEY, // Unsplash API Key
                    },
                });
                this.photos = response.data.results;
                this.$nextTick(() => {
                    // Initialize or reload Masonry after DOM has been updated with images
                    this.initializeMasonry();
                });
                this.loading = false;
            } catch (error) {
                console.error('Error fetching photos:', error);
                this.loading = false;
            }
        },
        initializeMasonry() {
            if (!this.masonry) {
                // Initialize the Masonry grid
                this.masonry = new Masonry(this.$refs.masonryGrid, {
                    itemSelector: '.masonry-item',
                    columnWidth: '.masonry-item',
                    gutter: 20, // Adjust for space between items
                    percentPosition: true,
                });
            } else {
                // Reload Masonry if it already exists
                this.masonry.reloadItems();
                this.masonry.layout();
            }
        },
    },
    mounted() {
        this.fetchPhotos(); // Fetch initial photos on mount
    },
};
</script>

<style scoped>
.grid-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
}

.masonry-item {
    width: calc(32% - 10px);
    /* 3-column layout */
    margin-bottom: 20px;
    position: relative;
}

.masonry-item img {
    display: block;
    width: 100%;
    height: auto;
}

.search-bar {
    max-width: 100%;
    border: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.bg-gradient-to-t {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}
</style>
