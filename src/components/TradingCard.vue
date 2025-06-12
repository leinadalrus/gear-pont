<script setup lang="ts">
defineProps<{ tradingCards: TradingCardMutationType[] }>()

type TradingCardType = {
    title: string
    author: string
    group: string
    content: string
    flavour: string
    image: string
    tags: Array<string>
}

export type TradingCardMutationType = TradingCardType & {
    id: number
}
</script>

<template>
    <article
        class="max-w-sm max-h-md rounded-b rounded-md shadow-lg text-[#0e020c] bg-[#f1eae4]"
        v-for="card in tradingCards"
    >
        <section class="px-2 py-1">
            <h1
                class="text-lg text-justify text-start font-light font-stretch-ultra-expanded italic"
            >
                {{ card.title }}
            </h1>
        </section>

        <img
            :src="card.image"
            alt="Card focus-hero portrait"
            class="max-w-full ma-h-xs px-1 rounded rounded-sm"
        />

        <div class="px-6 pt-4 pb-2">
            <span
                class="inline-block bg-[#446a4b] rounded-full px-2 py-1 text-sm text-[#f1eae4] mr-2 mb-2"
                v-for="tag in card.tags"
            >
                <i>{{ tag }}</i>
            </span>
        </div>
        <section class="px-6 py-4">
            <p class="font-medium text-md mb-2">{{ card.content }}</p>
            <i class="text-base">{{ card.flavour }}</i>
        </section>
    </article>
</template>
