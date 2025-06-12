import { onMounted, ref, watch } from 'vue'
import type { ProductCardMutationType } from '../(components)/ProductCard.vue'

type JsonHeadType = {
    key: string
    value: string
}

const gearwatchers = ref<ProductCardMutationType[]>([])
const GEARFLAT_KEYNAME = 'gearflats'

async function cacheTradeItems() {
    return {
        key: GEARFLAT_KEYNAME,
        value: JSON.stringify(gearwatchers.value)
    }
}

const convertBlobToBase64 = (blob: Blob) => {
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject

        reader.onload = () => {
            resolve(reader.result)
        }

        reader.readAsDataURL(blob)
    })
}

const loadSavedAsync = async (dataHeader: JsonHeadType) => {
    const tradingList = await cacheTradeItems()
    const tradesInPreferences = tradingList.value
        ? JSON.parse(tradingList.value)
        : []

    for (const trade of tradesInPreferences) {
        const item = {
            key: trade.key,
            value: dataHeader
        }

        trade.webviewPath = `data:image/jpeg;base64, ${item.value}`
    }
}

export const saveTradeAsync = async (
    trade: ProductCardMutationType,
    filenamePath: string
) => {
    const response = await fetch(trade.webviewPath!)
    const blob = await response.blob()
    const gearData = convertBlobToBase64(blob)

    return {
        id: 0,
        name: trade.name,
        description: trade.description,
        data: gearData,
        filenamePath: filenamePath,
        webviewPath: trade.webviewPath
    }
}

export const useStoreGallery = () => {
    onMounted(loadSavedAsync)

    const save = async (name: string) => {
        const trade = await cacheTradeItems()
        if (trade.key != name) return null
        return trade.key
    }
    return save
}

watch(gearwatchers, cacheTradeItems)
