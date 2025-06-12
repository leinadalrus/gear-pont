<script setup lang="ts">
import { ref } from 'vue'
import TradingCard, { type TradingCardMutationType } from './TradingCard.vue'

const cards = ref<TradingCardMutationType[]>([])

// const isModalActive = ref(false)
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
        @focus="handleFocus()"
        @blur="handleFocusLoss()"
        @mouseover="handleMouseOver()"
        @:mouseout="handleMouseOut()"
        v-for="i in cards"
        :key="i.id"
    >
        <TradingCard :trading-cards="cards" />
    </div>
</template>
