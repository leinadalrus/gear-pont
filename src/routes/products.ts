import express, { type Request, type Response } from 'express'
import asyncHandler from 'express-async-handler'
import { query } from 'express-validator'
import { ProductsController } from '../controllers/productsController'

export const prodRouter = express.Router()

const controller = new ProductsController()
const params = ['name', 'producer', 'distributor']

prodRouter
    .get(
        '/library',
        asyncHandler(async (request: Request, response: Response) => {
            response.sendStatus(200).json(request.params)
        })
    )
    .get('/view/:model', query(params).notEmpty().escape(), controller.view)
    .post(
        '/add',
        asyncHandler(async (request: Request, response: Response) => {
            response.sendStatus(201).json(request.params)
        }),
        controller.add
    )
    .post(
        '/delete/:model',
        query(params).notEmpty().escape(),
        controller.delete
    )
    .put('/edit/:model', query(params).notEmpty().escape(), controller.edit)
