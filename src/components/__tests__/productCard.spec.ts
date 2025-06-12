import { describe, test, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'

describe('Product Card', async () => {
    it('Component renders Product Card component', () => {
        const wrapper = mount(ProductCard)
        expect(wrapper.text()).contains(/^([\w])$/gm)
    })

    it('Using Vue $defineEmits prop-lambda "addProductToShoppingCart"', async () => {
        const wrapper = mount(ProductCard)
        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('addProductToShoppingCart')).toBeTruthy()
    })

    it('Using Vue $defineEmits prop-lambda "removeProductFromShoppingCart"', async () => {
        const wrapper = mount(ProductCard)
        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('removeProductFromShoppingCart')).toBeTruthy()
    })

    test.each([
        { slug: '/' },
        { slug: '/dashboard' },
        { slug: '/profile' },
        { slug: '/products' },
        { slug: '/shop' }
    ])('with slug pages...', async () => {
        it('display shopping cart', async () =>
            new Promise<void>(async (done) => {
                expect(/^(?i:[name])$/).toBe(true)

                expect(/^(?i:[producer])$/).toBe(true)

                expect(/^(?i:[synopsis])$/).toBe(true)

                expect(/^(?i:[image])$/).toBe(true)

                expect(/^(?i:[tags])$/).toBe(true)

                expect(/^(?i:[price])$/).toBe(true)

                done()
            }))
    })
})
