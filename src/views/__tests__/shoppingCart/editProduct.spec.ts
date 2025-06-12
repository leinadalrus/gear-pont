import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, test, it, expect } from 'vitest'

describe('Edit Product', async () => {
    await setup({
        host: `localhost:${process.env['SRV_PORT']}`,
        server: true,
        browser: true
    })

    test.each([{ slug: '/editProduct' }])(
        'Test with slug pages...',
        async ({ slug }) => {
            it('display shopping cart', async () =>
                new Promise<void>(async (done) => {
                    const storePage = await createPage(slug)
                    expect(
                        await storePage
                            .getByRole('textbox', { name: /^(?i:[name])$/ })
                            .isVisible()
                    ).toBe(true)

                    expect(
                        await storePage
                            .getByRole('textbox', { name: /^(?i:[producer])$/ })
                            .isVisible()
                    ).toBe(true)

                    expect(
                        await storePage
                            .getByRole('textbox', { name: /^(?i:[synopsis])$/ })
                            .isVisible()
                    ).toBe(true)

                    expect(
                        await storePage
                            .getByRole('img', { name: /^(?i:[image])$/ })
                            .isVisible()
                    ).toBe(true)

                    expect(
                        await storePage
                            .getByRole('option', { name: /^(?i:[tags])$/ })
                            .isVisible()
                    ).toBe(true)

                    expect(
                        await storePage
                            .getByRole('textbox', { name: /^(?i:[price])$/ })
                            .isVisible()
                    ).toBe(true)

                    done()
                }))
        }
    )
})
