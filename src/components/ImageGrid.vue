<script setup lang="ts">
import { ref } from 'vue'
import { useStoreGallery } from '../(composables)/useStoreGallery'
import TradingCard from './TradingCard.vue'
import type { ProductCardMutationType } from './ProductCard.vue'

const gearwatchers = ref<ProductCardMutationType[]>([])
</script>

<template>
    <section>
        <article>
            <div>
                <li v-for="gear in gearwatchers" :key="gear.id">
                    <TradingCard @vue:mounted="useStoreGallery()"></TradingCard>
                </li>
            </div>
        </article>
    </section>
</template>
