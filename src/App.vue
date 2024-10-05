<template>
  <div id="root" class="relativ w-full">
    <div class="w-full h-60 bg-[#DDE2E9]  -z-10"></div>
    <div id="app" class="z-10 absolute top-32 w-full px-12 flex  justify-center items-center">
      <LandingPage class="landing " :photos="photos" @image-click="openImageModal" />
      <ImageModal v-if="selectedPhoto" :photo="selectedPhoto" @close-modal="selectedPhoto = null" />
    </div>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage.vue';
import ImageModal from './components/ImageModal.vue';
import axios from 'axios'; // Import axios to make the API call

export default {
  name: 'App',
  components: {
    LandingPage,
    ImageModal,
  },
  data() {
    return {
      photos: [], // To hold fetched photos
      selectedPhoto: null, // For modal display
    };
  },
  mounted() {
    this.fetchImages(); // Fetch images on mount
  },
  methods: {
    async fetchImages() {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=africa&client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`
        );
        this.photos = response.data.results;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
    openImageModal(photo) {
      this.selectedPhoto = photo;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
 
  margin: 0 auto;
  text-align: center;
}

.landing {
  max-width: 1280px;
}

#root {
}
</style>
