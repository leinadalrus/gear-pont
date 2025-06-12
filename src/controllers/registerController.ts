import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { UserModelAssembler } from '../models/userSchema'

export class RegisterController {
    model = new UserModelAssembler()

    // JWT-based login authentication
    email = async (request: Request, response: Response) => {
        const { email } = request.body

        const user = await UserModelAssembler.findOne({
            email
        })

        if (user)
            response
                .sendStatus(409)
                .json({ error: 'Error: Email already present...' })

        response.sendStatus(200).json({ email })
    }

    signup = async (request: Request, response: Response) => {
        try {
            const { username, email, password } = request.body

            const user = await UserModelAssembler.findOne({
                username,
                email,
                password
            })

            if (user)
                response
                    .sendStatus(400)
                    .json({ error: 'Error: Existing User...' })

            const hashed = bcrypt.hash(password, process.env['SALT_ROUNDS'])

            const submission = UserModelAssembler.create({
                username,
                email,
                hashed
            })

            response.sendStatus(201).json({ username, email, hashed })
            await (await submission).save()
        } catch (err) {
            response.status(500).json({ error: '500: Internal Server Error.' })
            console.table(err)
        }
    }

    findEmail = async (email: string) => {
        const conv = await this.model.findOne({ email }, 'email').lean()
        const result = String(conv)
        return result
    }
}
