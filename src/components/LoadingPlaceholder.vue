<template>
    <div class="loading-placeholder"></div>
</template>

<script>
export default {
    name: 'LoadingPlaceholder',
};

</script>

<style scoped>
.loading-placeholder {
    width: 100%;
    height: 300px;
    background-color: #e0e0e0;
    animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        background-color: #f0f0f0;
    }

    50% {
        background-color: #e0e0e0;
    }

    100% {
        background-color: #f0f0f0;
    }
}
</style>
