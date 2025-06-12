<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ albumArts: AlbumArtMutationType[] }>()

type AlbumArtType = {
    title: string
    image: string
    tags: Array<string>
}

export type AlbumArtMutationType = AlbumArtType & {
    id: number
}

const albums = ref<AlbumArtMutationType[]>([])
</script>

<template>
    <article
        class="max-w-sm max-h-sm rounded rounded-lg shadow-lg text-[#0e020c] bg-[#f1eae4]"
        v-for="album in albums"
        :key="album.id"
    >
        <img
            v-bind:src="album.image"
            alt="Card focus-hero portrait"
            class="w-xs h-xs rounded rounded-sm"
        />

        <section class="px-4 py-2">
            <h1>{{ album.title }}</h1>
        </section>

        <div class="px-6 pt-4 pb-2">
            <span
                class="inline-block bg-[#446a4b] rounded-full px-2 py-1 text-sm text-[#f1eae4] mr-2 mb-2"
                v-for="tag in album.tags"
                :key="tag"
            >
                {{ tag }}
            </span>
        </div>
    </article>
</template>
