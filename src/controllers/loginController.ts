import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { UserModelAssembler } from '../models/userSchema'

export class LoginController {
    model = new UserModelAssembler()

    // JWT-based login authentication
    email = async (request: Request, response: Response) => {
        const { email } = request.body

        const user = await UserModelAssembler.findOne({
            email
        })

        if (!user)
            response
                .sendStatus(409)
                .json({ error: 'Error: for e-mail address.' })

        response.sendStatus(202).json({ email })
    }

    password = async (request: Request, response: Response) => {
        const { password } = request.body

        const user = await UserModelAssembler.findOne({
            password
        })

        if (!user)
            response.sendStatus(401).json({ error: 'Error: invalid input...' })

        const promised = bcrypt.compare(password, process.env['SECRET_HASH'])

        response.sendStatus(202).json({ password: promised })
    }

    authenticate = async (request: Request, response: Response) => {
        try {
            const { username, password } = request.body

            const bearers = jsonwebtoken.verify(
                request.header('Authorization')?.replace('Bearers', ''),
                process.env['SECRET_KEY']
            )

            const user = await UserModelAssembler.findOne({
                username: username,
                password: password
            })
            if (!user)
                response.sendStatus(401).json({
                    error: '401 Error: Your Username or Password is wrong!'
                })

            await bcrypt.compare(user.email, bearers.email)
            await bcrypt.compare(user.password, bearers.password)

            const tokenized = jsonwebtoken.sign(
                {
                    email: user.email,
                    password: user.password
                },

                process.env['SECRET_KEY']
            )

            response.sendStatus(200).json({ token: tokenized })
        } catch (err) {
            response
                .sendStatus(500)
                .json({ error: 'Internal Server Error: 500' })
            console.table(err)
        }
    }

    login = async (request: Request, response: Response) => {
        this.authenticate(request.body.username, request.body.password)
        response.send('login.submit')
    }

    findEmail = async (email: string) => {
        const conv = await this.model.findOne({ email }, 'email').lean()
        const result = String(conv)
        return result
    }
}
