<script setup lang="ts">
import Poster, { type PosterMutationType } from './Poster.vue'
import SearchField from './SearchField.vue'

const posterCards = ref<PosterMutationType[]>([])
</script>

<template>
    <div
        class="fixed top-0 right-0 z-40 w-64 h-screen \ transition-transform -translate-x-full sm:-translate-x-sm xs:-translate-x-xs p-4 mx-1"
    >
        <aside class="flex flex-col items-center justify-center gap-6">
            <h1>Gear-Flat</h1>

            <Poster :posters="posterCards" />

            <SearchField />
        </aside>
    </div>
</template>
