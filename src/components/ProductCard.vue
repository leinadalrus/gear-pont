<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    products: ProductCardMutationType[]
}>()

const emit = defineEmits([
    'addProductToShoppingCart',
    'removeProductFromShoppingCart'
]) // Arbitrarily calls function

export type ProductCardType = {
    name: string
    producer: string
    distributor: string
    description: string
    synopsis: string
    image: string
    tags: Array<string>
    price: number
}

export type ProductCardMutationType = ProductCardType & {
    id: number
    quantity: number
    discount?: number
    availability: boolean
    webviewPath: string
}

const shoppingCartList = ref<ProductCardMutationType[]>([])
const inShoppingCartAlready = ref(false)

function addProductToShoppingCart(product: ProductCardMutationType) {
    const productAlreadyIn = shoppingCartList.value?.find(
        (item: { id: number }) => item.id == product.id
    )
    if (productAlreadyIn) {
        return shoppingCartList.value
            ?.filter((item: { id: number }) =>
                item.id == product.id ? { ...item } : item
            )
            .pop()
    }

    shoppingCartList.value?.push(product)
    emit('addProductToShoppingCart')

    return { ...shoppingCartList }
}

function removeProductFromShoppingCart(product: ProductCardMutationType) {
    shoppingCartList.value
        .filter((i: { id: number }) => i.id != product.id)
        .pop()
    emit('removeProductFromShoppingCart')
}
</script>

<template>
    <article
        class="max-w-sm max-h-md rounded-b rounded-md shadow-lg text-[#0e020c] bg-[#f1eae4]"
        v-for="product in products"
        :key="product.id"
    >
        <section class="px-2 py-1">
            <h1
                class="text-lg text-justify text-start font-light font-stretch-ultra-expanded italic"
            >
                {{ product.name }}
            </h1>

            <span>
                by
                <i>{{ product.producer }}</i>
            </span>
        </section>

        <img
            :src="product.image"
            alt="Card focus-hero portrait"
            class="max-w-full ma-h-xs px-1 rounded rounded-sm"
        />

        <div class="px-6 pt-4 pb-2">
            <span
                class="inline-block bg-[#446a4b] rounded-full px-2 py-1 text-sm text-[#f1eae4] mr-2 mb-2"
                v-for="tag in product.tags"
                :key="tag"
            >
                <i>{{ tag }}</i>
            </span>
        </div>

        <section class="px-6 py-4">
            <p class="font-medium text-md mb-2">{{ product.description }}</p>
        </section>

        <code class="px-6 py-4">{{ product.price }}</code>

        <div v-if="inShoppingCartAlready == true">
            <button
                class="px-6 py-4"
                @click="removeProductFromShoppingCart(product)"
            >
                Remove from cart? &ominus;
            </button>
        </div>

        <button class="px-6 py-4" @click="addProductToShoppingCart(product)">
            Add to cart? &oplus;
        </button>
    </article>
</template>
