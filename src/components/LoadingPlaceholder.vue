<template>
    <div :style="{ height: height + 'px' }" class="loading-placeholder relative">

        <div class="absolute left-4 bottom-4 flex flex-col items-start gap-2 w-full">
            <div class="w-3/5 p-2 rounded-xl bg-[#cecccc]"></div>
            <div class="w-2/5 p-2 rounded-xl bg-[#cecccc]"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingPlaceholder',
    props: {
        height: {
            type: Number,
            default: 200, // Default height if none is provided
        },
    },
};
</script>

<style scoped>
.loading-placeholder {
    width: 100%;
    height: 400px;
    background-color: #F6F6F6;
    animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        background-color: #ffffff;
    }

    50% {
        background-color: #F6F6F6;
    }

    100% {
        background-color: #ffffff;
    }
}
</style>
