<script setup lang="ts">
import TradingCard, { type TradingCardType } from './TradingCard.vue'

const cards = ref<TradingCardType[]>()

const isModalActive = ref(false)
const setModalAsActive = ref(false)

function handleMouseOver() {
    setModalAsActive.value = true
}

function handleMouseOut() {
    setModalAsActive.value = false
}

function handleFocus() {
    setModalAsActive.value = true
}

function handleFocusLoss() {
    setModalAsActive.value = false
}
</script>
<template>
    <div
        v-on:focus="handleFocus()"
        v-on:blur="handleFocusLoss()"
        v-on:mouseover="handleMouseOver()"
        v-on:mouseout="handleMouseOut()"
        v-for="i in cards"
    >
        <TradingCard
            :title="i.title"
            :content="i.content"
            :flavour="i.flavour"
            :image="i.image"
            :author="i.author"
            :group="i.group"
            :tags="i.tags"
        />
    </div>
</template>
