import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { ProductModelAssembler } from '../models/productSchema'

export class ProductsController {
    // lga = new ProductGameArticle()
    model = new ProductModelAssembler()

    view = async (request: Request, response: Response) => {
        // NOTE(data): gameRepository.get(id)
        const name = this.findName(request.body.name)
        const producer = this.findProducer(request.body.producer)
        const distributor = this.findDistributor(request.body.distributor)

        const model = await ProductModelAssembler.findOne({
            name: name,
            producer: producer,
            distributor: distributor
        })

        if (!model)
            response
                .status(409)
                .json({ error: 'Error: invalid input for the given field(s).' })

        response.sendStatus(202).json({
            name: name,
            producer: producer,
            distributor: distributor
        })
    }

    add = async (request: Request, response: Response) => {
        const { name, producer, distributor } = request.body

        const model = await ProductModelAssembler.findOne({
            name,
            producer,
            distributor
        })

        if (model)
            response
                .status(400)
                .json({ error: 'Error: Existing article/item...' })

        const creation = ProductModelAssembler.create({
            name,
            producer,
            distributor
        })

        response.sendStatus(201).json({ name, producer, distributor })
        await (await creation).save()
    }

    edit = async (request: Request, response: Response) => {
        const { name, producer, distributor } = request.body

        const model = await ProductModelAssembler.findOne({
            name,
            producer,
            distributor
        })

        if (!model)
            response.status(400).json({
                error: 'Error: Cannot get library game article/item...'
            })

        model.updateOne({
            name,
            producer,
            distributor
        })

        await model.save()
    }

    delete = async (request: Request, response: Response) => {
        const { name, producer, distributor } = request.body

        const model = await ProductModelAssembler.findOne({
            name,
            producer,
            distributor
        })

        const items = [name, producer, distributor]

        model.findByIdAndDelete(items)
        response.sendStatus(200)
    }

    findName = (name: string) => {
        const query = this.model.find({ name })
        query.select('name producer distributor')
        query.limit(10)
        query.exec()
    }

    findProducer = (producer: string) => {
        const query = this.model.find({ producer })
        query.select('name producer distributor')
        query.limit(10)
        query.exec()
    }

    findDistributor = (distributor: string) => {
        const query = this.model.find({ distributor })
        query.select('name producer distributor')
        query.limit(10)
        query.exec()
    }
}
