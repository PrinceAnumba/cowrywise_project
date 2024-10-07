
<template>
    <div @click="openModal"
        class="relative group rounded-lg overflow-hidden masonry-item w-full sm:w-[calc(48% - 10px)] lg:w-[calc(31% - 10px)] cursor-pointer">
        <LoadingPlaceholder v-if="loading" :height="height" class="z-70" />

        <img v-else :src="photo.urls.regular" :alt="photo.alt_description"
            class="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />

        <div class="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity"></div>

        <div v-if="!loading"
            class="absolute bottom-0 left-0 w-full bg-gradient-to-t flex flex-col items-start from-black to-transparent p-4">
            <p class="text-base font-semibold text-white">{{ photo.user.name }}</p>
            <p class="text-xs text-gray-300">{{ photo.location?.name || 'Unknown location' }}</p>
        </div>
    </div>
</template>

<script>
import LoadingPlaceholder from './LoadingPlaceholder.vue';

export default {
    name: 'ImageCard',
    props: {
        photo: Object,
        loading: Boolean,
        height: Number,
    },
    methods: {
        openModal() {
            this.$emit('open-modal', this.photo);
        },
    },
    components: {
        LoadingPlaceholder,
    },
};
</script>

<style scoped>
.masonry-item {
    position: relative;
    margin-bottom: 20px;
}
</style>
