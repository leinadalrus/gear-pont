<script setup lang="ts">
import type { AlbumArtMutationType } from '../(components)/AlbumArt.vue'
import AlbumArt from '../(components)/AlbumArt.vue'
import TradingCard, {
    type TradingCardMutationType
} from '../(components)/TradingCard.vue'

interface IActivityView {
    id: number
    timeof: string
    logline: string
}

const activity = shallowRef<IActivityView[]>([])
const albums = shallowRef<AlbumArtMutationType[]>([])
const cards = shallowRef<TradingCardMutationType[]>([])
</script>

<template>
    <main>
        <section>
            <TradingCard :trading-cards="cards" />
        </section>

        <section>
            <AlbumArt :album-arts="albums" />
        </section>

        <section>
            <li v-for="i in activity" v-bind:key="i.id">
                <i>{{ i.timeof }}</i>
                <p>{{ i.logline }}</p>
            </li>
        </section>
    </main>
</template>
