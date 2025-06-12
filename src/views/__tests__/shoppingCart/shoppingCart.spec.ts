import { setup, createPage } from '@nuxt/test-utils/e2e'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import {
    addProductToShoppingCart,
    removeProductFromShoppingCart,
    type ProductCardMutationType
} from '~/pages/(components)/ProductCard.vue'
import ShoppingCart from '~/pages/shoppingCart/ShoppingCart.vue'

const testProductA: ProductCardMutationType = {
    id: 0,
    name: '',
    producer: '',
    distributor: '',
    description: '',
    synopsis: '',
    image: '',
    tags: [''],
    price: 0,
    quantity: 1,
    discount: 0,
    availability: true,
    webviewPath: ''
}

describe('Shopping Cart', async () => {
    await setup({
        host: `localhost:${process.env['SRV_PORT']}`
    })

    describe('Shopping Cart code logic', () => {
        it('Add a new product into the Shopping Cart', async () => {
            new Promise<void>(async (done) => {
                const shoppingCart: ProductCardMutationType[] = []
                const updated = addProductToShoppingCart(testProductA)

                expect(updated).toHaveLength(1)
                expect(updated).toMatchObject({ ...shoppingCart })

                done()
            })
        })

        it('Increase the quantity if the same product is already in the shopping cart.', async () => {
            new Promise<void>(async (done) => {
                const shoppingCart: ProductCardMutationType[] = [
                    { ...testProductA }
                ]
                const updated = addProductToShoppingCart(testProductA)

                expect(updated).toHaveLength(2)
                expect(updated).toMatchObject({ ...shoppingCart })

                done()
            })
        })

        it('Remove the product in the shopping cart.', async () => {
            new Promise<void>(async (done) => {
                const shoppingCart: ProductCardMutationType[] = [
                    { ...testProductA }
                ]
                const updated = removeProductFromShoppingCart(testProductA)

                expect(updated).toHaveLength(1)
                expect(updated).toMatchObject({ ...shoppingCart })

                done()
            })
        })

        it('Using Vue $defineEmits prop-lambda "removeProductFromShoppingCart"', async () => {
            new Promise<void>(async (done) => {
                const wrapper = mount(ShoppingCart)
                await wrapper.find('button').trigger('click')

                expect(
                    wrapper.emitted('removeProductFromShoppingCart')
                ).toBeTruthy()

                done()
            })
        })
    })

    it('display shopping cart', async () => {
        new Promise<void>(async (done) => {
            const shoppingCart = await createPage('/shoppingCart')
            expect(
                await shoppingCart.getByText(/^(?i:[name])$/).isVisible()
            ).toBe(true)

            expect(
                await shoppingCart.getByText(/^(?i:[price])$/).isVisible()
            ).toBe(true)

            expect(
                await shoppingCart.getByText(/^(?i:[quantity])$/).isVisible()
            ).toBe(true)

            expect(
                await shoppingCart.getByText(/^(?i:[discount])$/).isVisible()
            ).toBe(true)

            done()
        })
    })
})
