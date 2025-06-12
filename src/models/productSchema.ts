import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: 8,
            maxLength: 16,
            trim: true,
            required: true
        },
        producer: {
            type: String,
            minLength: 8,
            maxLength: 16,
            trim: true,
            required: true
        },
        distributor: {
            type: String,
            minLength: 8,
            maxLength: 32,
            trim: true,
            required: true
        }
    },
    { collection: 'products' }
)

export const ProductModelAssembler = mongoose.model('Product', ProductSchema)
