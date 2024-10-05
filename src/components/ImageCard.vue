<template>
    <div class="image-card transition-all  rounded" @click="openModal">
        <div class="overlay">
            <p>{{ photo.user.name }}</p>
            <p>{{ photo.location?.name || 'Unknown Location' }}</p>
        </div>
        <img :src="photo.urls.small" :alt="photo.alt_description">
    </div>
</template>

<script>
export default {
    name: 'ImageCard',
    props: ['photo'],
    methods: {
        openModal() {
            this.$emit('open-modal', this.photo);
        }
    }
};
</script>

<style scoped>
.image-card {
    position: relative;
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
}

img {
    width: 100%;
    height: auto;
    display: block;
}
</style>
