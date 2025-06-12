<script setup lang="ts">
import AlbumArt, {
    type AlbumArtMutationType
} from '../(components)/AlbumArt.vue'
import TradingCard, {
    type TradingCardMutationType
} from '../(components)/TradingCard.vue'
import Dashboard from '../dashboard/Dashboard.vue'

interface IProfileInfo {
    username: string
    group: string
    image: string
    title: string
    description: string
}

const profile = ref<IProfileInfo>()
const albums = shallowRef<AlbumArtMutationType[]>([])
const cards = shallowRef<TradingCardMutationType[]>([])
</script>

<template>
    <Dashboard />

    <section>
        <div>
            <AlbumArt :album-arts="albums" />
        </div>

        <TradingCard :trading-cards="cards" />
    </section>
</template>
