import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, test, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '~/pages/(components)/ProductCard.vue'

describe('Product Card', async () => {
    await setup({
        host: `localhost:${process.env['SRV_PORT']}`,
        server: true,
        browser: true
    })

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
    ])('Test with slug pages...', async ({ slug }) => {
        it('display shopping cart', async () =>
            new Promise<void>(async (done) => {
                const storePage = await createPage(slug)
                expect(
                    await storePage.getByText(/^(?i:[name])$/).isVisible()
                ).toBe(true)

                expect(
                    await storePage.getByText(/^(?i:[producer])$/).isVisible()
                ).toBe(true)

                expect(
                    await storePage.getByText(/^(?i:[synopsis])$/).isVisible()
                ).toBe(true)

                expect(
                    await storePage.getByText(/^(?i:[image])$/).isVisible()
                ).toBe(true)

                expect(
                    await storePage.getByText(/^(?i:[tags])$/).isVisible()
                ).toBe(true)

                expect(
                    await storePage.getByText(/^(?i:[price])$/).isVisible()
                ).toBe(true)

                done()
            }))
    })
})
