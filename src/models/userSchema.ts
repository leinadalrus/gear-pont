import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minLength: 8,
            maxLength: 16,
            trim: true,
            required: true
        },
        email: {
            type: String,
            minLength: 8,
            maxLength: 16,
            trim: true,
            required: true
        },
        password: {
            type: String,
            minLength: 8,
            maxLength: 32,
            trim: true,
            required: true
        }
    },
    { collection: 'users' }
)

export const UserModelAssembler = mongoose.model('User', UserSchema)
