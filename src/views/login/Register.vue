<script setup lang="ts">
import { ref } from 'vue'
import { UserModelAssembler } from '~/server/models/UserSchema'

import bcrypt from 'bcryptjs'

interface IRegisterForm {
    email: string
    password: string
}

const form = ref<IRegisterForm>({
    email: '',
    password: ''
})

const confirmPassword = ref('')
const erroneous = ref('')

const statusCode = ref(0)
const isLoading = ref(false)

const email = async (request: Request, response: Response) => {
    const body = request.body

    const user = await UserModelAssembler.findOne({
        body
    })

    if (user) return { statusCode: 409, JSON: erroneous }

    return { statusCode: 200, JSON: body }
}

const onSubmit = async (request: Request, response: Response) => {
    const headers = new Headers()

    // NOTE(Authorisation): request.header('Authorization').replace('Bearer', '')
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const requestInfo = new Request(request.url, {
        method: request.method,
        headers: headers
    })

    // For values that are not-truly-constant-
    try {
        // -we want to have them be invoked when in our try-catch statement
        if (form.value.password !== confirmPassword.value) {
            return { status: 401 }
        }

        const data = request.formData

        const user = await UserModelAssembler.findOne({
            data
        })
        if (user) return { statusCode: 400, JSON: erroneous }

        const hashed = await bcrypt.hash(
            form.value.password,
            process.env.SALT_ROUNDS
        )

        const register = UserModelAssembler.create({
            email,
            hashed
        })
        await (await register).save()

        return fetch(requestInfo)
            .then((d) => d.json())
            .then((d) => {
                statusCode.value = 201
                // We return as an interfaced-array type-
                return d as IRegisterForm[] // -because of our JSON output value
            })
    } catch (err) {
        console.table(err)
        return { statusCode: 500, JSON: erroneous }
    }
}

function findEmail(email: string): string {
    const find = UserModelAssembler.findOne({ email }, 'email')
        .select('email')
        .lean()
    const result = String(find)

    return result
}
</script>

<template>
    <form action="" method="post" :onsubmit="onSubmit">
        <label for="email">e-Mail</label>
        <input type="email" name="" id="" maxlength="16" required />

        <label for="password">Password</label>
        <input
            type="password"
            name="password"
            id=""
            minlength="8"
            maxlength="32"
            required
        />

        <label for="confirmPassword">Confirm Password</label>
        <input
            type="password"
            name="password"
            id=""
            minlength="8"
            maxlength="32"
            required
        />

        <button type="submit" v-bind:disabled="isLoading">Sign up?</button>
    </form>

    <span v-if="erroneous">{{ erroneous }}</span>
</template>
