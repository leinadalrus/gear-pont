<script setup lang="ts">
defineProps<{
    posters: PosterMutationType[]
}>()

type PosterType = {
    height: number
    width: number
    title: string
    flavour: string
    logline: string
}

export type PosterMutationType = PosterType & {
    id: number
}
</script>

<template>
    <article
        id="poster-container"
        class="max-w-sm max-h-md rounded-b rounded-md shadow-lg text-[#0e020c] bg-[#f1eae4]"
        v-for="poster in posters"
    >
        <section class="px-2 py-1">
            <h1
                class="text-lg text-justify text-start font-light font-stretch-ultra-expanded italic"
            >
                {{ poster.title }}
            </h1>
        </section>

        <section class="px-6 py-4">
            <i class="text-base italic">{{ poster.flavour }}</i>
            <p class="font-medium text-md mb-2">{{ poster.logline }}</p>
        </section>
    </article>
</template>
