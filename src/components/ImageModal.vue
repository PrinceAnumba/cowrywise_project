
<template>
    <div class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <button @click="closeModal" class="absolute top-12 right-12 text-slate-300 text-2xl font-bold cursor-pointer">
            &times;
        </button>

        <div class="bg-white rounded-lg relative max-w-lg w-full">
            <img :src="photo.urls.regular" :alt="photo.alt_description"
                class="w-full h-auto object-cover max-h-[80vh] rounded-t-lg" />

            <div class="mt-4 text-left p-6">
                <p class="text-lg font-semibold">{{ photo.user.name }}</p>
                <p class="text-sm text-gray-600">{{ photo.location?.name || 'Unknown location' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageModal',
    props: {
        photo: Object,
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
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
