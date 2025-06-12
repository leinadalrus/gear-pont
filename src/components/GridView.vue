<script setup lang="ts">
import { ref } from 'vue'
import AlbumArt, { type AlbumArtMutationType } from './AlbumArt.vue'

const albums = ref<AlbumArtMutationType[]>([])
</script>

<template>
    <section
        class="grid grid-cols-3 grid-rows-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4"
        v-for="album in albums"
        :key="album.id"
    >
        <AlbumArt :album-arts="albums" />
    </section>
</template>
