<script setup lang="ts">
import type { ProductCardMutationType } from '../(components)/ProductCard.vue'

const productForm = ref<ProductCardMutationType>()

const emits = defineEmits(['saveProduct', 'discardProduct'])
</script>

<template>
    <form action="" method="post">
        <label for="name">Product name</label>
        <input type="text" name="name" id="" />

        <label for="">Description</label>
        <input type="text" name="description" id="" />

        <label for="">Synopsis</label>
        <input type="text" name="synopsis" id="" />

        <label for="">Pricing</label>
        <input type="number" name="price" id="" />

        <label for="">Quantity</label>
        <input type="number" name="quantity" id="" />

        <label for="">Tags</label>
        <option value="tags">
            <select name="game" id="">
                Games
            </select>
            <select name="comic" id="">
                Comics
            </select>
            <select name="illustration" id="">
                Illustrations
            </select>
            <select name="accessory" id="">
                Accessories
            </select>
            <select name="video" id="">
                Videos
            </select>
            <select name="voice" id="">
                Voice
            </select>
            <select name="music" id="">
                Music
            </select>
            <select name="tool" id="">
                Tools
            </select>
        </option>

        <button type="submit">Save</button>

        <button type="button" @onclick=";-1">Discard</button>
    </form>
</template>
