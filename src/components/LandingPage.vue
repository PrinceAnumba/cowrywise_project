<template>
    <div class="w-full px-6">
        <!-- Centered Search Bar or Search Results Text -->
        <div class="mb-8">
            <!-- Conditionally show the search bar or the search results text -->
            <div v-if="showSearchBar"
                class="search-bar bg-white shadow-lg p-4 rounded-lg flex items-center relative z-10 mx-auto max-w-4xl">
                <span class="material-symbols-outlined text-gray-400 font-semibold">search</span>
                <input v-model="searchQuery" @keyup.enter="initiateSearch" type="text" placeholder="Search for photo"
                    class="w-full text-gray-700 focus:outline-none pl-4 font-semibold text-base placeholder-gray-400" />
            </div>

            <!-- Search results text and Back button -->
            <div v-else class="flex justify-between items-center">
                <p class="text-2xl text-sky-700 font-semibold">Search results for "{{ searchQuery }}"</p>
                <button @click="resetSearch" class="text-blue-500 hover:underline">Back to Search</button>
            </div>
        </div>

        <!-- Photo Grid (Tailwind Grid Layout) -->
        <div ref="masonryGrid" class="grid-container">
            <div v-for="(photo, index) in photos" :key="photo.id" @click="openModal(photo)"
                class="relative group rounded-lg overflow-hidden masonry-item w-full sm:w-[calc(48% - 10px)] lg:w-[calc(31% - 10px)] cursor-pointer">

                <!-- Loading Placeholder with Random Height -->
                <LoadingPlaceholder v-if="loadingImages[index]" :height="randomHeights[index]" class="z-70" />

                <!-- Image -->
                <img v-else :src="photo.urls.regular" :alt="photo.alt_description"
                    class="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />

                <!-- Tint Overlay -->
                <div class="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity"></div>

                <!-- Text Overlay with Dark Background (Matching the Image) -->
                <div v-if="!loadingImages[index]"
                    class="absolute bottom-0 left-0 w-full bg-gradient-to-t flex flex-col items-start from-black to-transparent p-4">
                    <p class="text-base font-semibold text-white">{{ photo.user.name }}</p>
                    <p class="text-xs text-gray-300">{{ photo.location?.name || 'Unknown location' }}</p>
                </div>
            </div>
        </div>

        <!-- Modal for Image Preview -->
        <div v-if="selectedPhoto" class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <!-- Close Button -->
            <button @click="closeModal"
                class="absolute top-12 right-12 text-slate-300 text-2xl font-bold cursor-pointer">&times;</button>

            <div class="bg-white rounded-lg relative max-w-lg w-full">
                <!-- Image in Modal -->
                <img :src="selectedPhoto.urls.regular" :alt="selectedPhoto.alt_description"
                    class="w-full h-auto object-cover max-h-[80vh] rounded-t-lg" />

                <!-- Image Description -->
                <div class="mt-4 text-left p-6">
                    <p class="text-lg font-semibold">{{ selectedPhoto.user.name }}</p>
                    <p class="text-sm text-gray-600">{{ selectedPhoto.location?.name || 'Unknown location' }}</p>
                </div>
            </div>
        </div>

        <!-- Loading Indicator -->
    </div>
</template>


<script>
import axios from 'axios';
import Masonry from 'masonry-layout';
import LoadingPlaceholder from './LoadingPlaceholder.vue';

export default {
    name: 'LandingPage',
    components: {
        LoadingPlaceholder,
    },
    data() {
        return {
            searchQuery: 'Africans', // Default search query
            photos: [],
            loadingImages: [], // Array to manage individual image loading states
            randomHeights: [], // Array to store random heights for loading placeholders
            masonry: null, // For the Masonry instance
            selectedPhoto: null, // To store the selected photo for modal
            showSearchBar: true, // Controls the visibility of the search bar
        };
    },
    methods: {
        async fetchPhotos() {
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: this.searchQuery,
                        per_page: 15, // Number of images
                        client_id: process.env.VUE_APP_UNSPLASH_ACCESS_KEY, // Unsplash API Key
                    },
                });
                this.photos = response.data.results;
                this.loadingImages = Array(this.photos.length).fill(true); // Set all images to loading initially
                this.randomHeights = this.photos.map(() => Math.floor(Math.random() * (400 - 200 + 1) + 200)); // Random heights between 200 and 400

                setTimeout(() => {
                    this.loadingImages = this.loadingImages.map(() => false); // Set all loading flags to false after a delay
                    this.$nextTick(() => {
                        this.initializeMasonry(); // Initialize Masonry after images are loaded
                    });
                }, 10000);
            } catch (error) {
                console.error('Error fetching photos:', error);
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
        openModal(photo) {
            this.selectedPhoto = photo; // Set the clicked photo to selectedPhoto
        },
        closeModal() {
            this.selectedPhoto = null; // Clear the selected photo and close the modal
        },
        initiateSearch() {
            this.fetchPhotos(); // Fetch photos when search is initiated
            this.showSearchBar = false; // Hide the search bar and show the "Search results for ..." text
        },
        resetSearch() {
            this.showSearchBar = true; // Show the search bar again
            this.photos = []; // Clear the photos
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
    cursor: pointer;
    /* Make the cursor a pointer on hover */
}

/* Mobile: Single column */
@media (max-width: 640px) {
    .masonry-item {
        width: 100%;
        /* Full width on mobile */
    }
}

/* Tablet: 2 columns */
@media (min-width: 640px) and (max-width: 1024px) {
    .masonry-item {
        width: calc(48% - 10px);
        /* Two columns on tablet */
    }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
    .masonry-item {
        width: calc(31% - 10px);
        /* Three columns on larger screens */
    }
}

.search-bar {
    max-width: 100%;
    border: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.bg-gradient-to-t {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

/* Modal Styles */
.fixed {
    display: flex;
    align-items: center;
    justify-content: center;
}

.bg-opacity-75 {
    backdrop-filter: blur(10px);
}

button {
    border: none;
    background: none;
}
</style>
