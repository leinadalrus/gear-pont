<script setup lang="ts">
import { ref } from 'vue'
import ProductCard, { type ProductCardMutationType } from './ProductCard.vue'

const productCards = ref<ProductCardMutationType[]>([])
</script>

<template>
    <section
        class="grid grid-cols-1 grid-rows-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4"
        v-for="product in productCards"
        v-bind:key="product.id"
    >
        <ProductCard :products="productCards" />
    </section>
</template>
