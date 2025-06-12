import { ref, watch } from 'vue'
import type { ProductCardMutationType } from '../(components)/ProductCard.vue'

type MessageHeadType = {
    method: string
    body: string
}

const messageHeads = ref<MessageHeadType[]>([])

const { data, error } = await useAsyncData(() => useHandleSubmit())

const useHandleSubmit = async () => {
    await $fetch('api/submit', {
        method: 'POST',
        body: { data }
    })

    if (error != null) return null
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

export const handleSubmitAsync = async (
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

watch(messageHeads, useHandleSubmit)
