<script setup lang="ts">
defineProps({
    icon: {
        type: String,
        required: true
    },
    alt: { type: String }
})
</script>

<template>
    <img :src="icon" :alt="alt" />
</template>
