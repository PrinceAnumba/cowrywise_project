<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <p class="text-2xl text-sky-700 font-semibold">Search results for "{{ searchQuery }}"</p>
            <button @click="$emit('reset')" class="text-blue-500 hover:underline">Back to Search</button>
        </div>
        <div v-if="noResultsFound" class="text-center text-red-500 text-xl font-semibold mt-8">
            No results found for "{{ searchQuery }}". Please try again with a different search term.
        </div>
        <div ref="masonryGrid" class="grid-container">
            <ImageCard v-for="(photo, index) in photos" :key="photo.id" :photo="photo" :loading="loadingImages[index]"
                :height="randomHeights[index]" @click="openModal(photo)" />
        </div>
    </div>
</template>

<script>
import ImageCard from './ImageCard.vue';

export default {
    props: {
        photos: Array,
        loadingImages: Array,
        randomHeights: Array,
        searchQuery: String,
        noResultsFound: Boolean,
    },
    components: {
        ImageCard,
    },
    methods: {
        openModal(photo) {
            this.$emit('open-modal', photo);
        },
    },
};
</script>
