import express, { type Request, type Response } from 'express'
import asyncHandler from 'express-async-handler'
import { query } from 'express-validator'

import { LoginController } from '../controllers/loginController'
import { RegisterController } from '../controllers/registerController'

const login = new LoginController()
const register = new RegisterController()

export const authRouter = express.Router()

const restrict = async (request: Request, response: Response) => {
    if (request.session.id == null || request.session.id == '')
        response.redirect('/login')
}

authRouter.get(
    '/',
    asyncHandler(async (request: Request, response: Response) => {
        response.redirect('/login')
    })
)

authRouter.get(
    '/restricted',
    asyncHandler(async (request: Request, response: Response) => {
        restrict(request, response)

        response.send('restricted! returning to Login...')
        response.redirect('/login')
    })
)

authRouter.get(
    '/register',
    query('register').notEmpty().escape(),
    asyncHandler(async (request: Request, response: Response) => {
        response.send(request.params)
    })
)

authRouter.get(
    '/register/:signup',
    asyncHandler(async (request: Request, response: Response) => {
        register.signup(request, response)
        response.send(request.query.action)
        response.redirect('/login')
    })
)

// TODO(Sentinel): create a sentinel-
// -to manage authenticated users against routes.

authRouter.get(
    '/login/:authenticate',
    query('login').notEmpty().escape(),
    asyncHandler(async (request: Request, response: Response) => {
        login.authenticate(request.body.username, request.body.password)
        response.send(request.params)
    })
)

authRouter.get(
    '/logout',
    asyncHandler(async (request: Request, response: Response) => {
        request.session.destroy(() => {
            response.redirect('/login')
        })
    })
)
