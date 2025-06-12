import express, { type Request, type Response } from 'express'
import bodyParser from 'body-parser'

const router = express.Router()

type PaymentRequestType = {
    amount: number
    currency: string
    orderId: string
    method: 'creditCard' | 'debitCard' | 'bankTransfer' | 'thirdParty'
}

export type PaymentRequestMutationType = PaymentRequestType & {
    card?: {
        number: number
        cvv: number
        expiry: string
        name: string
    }
}

type PaymentResponseType = {
    status: string
    errorMessage?: string
    transactionId?: string
}

export type GatewayResultType = PaymentResponseType

router.use(bodyParser.json())

router.post('api/payment', async (request: Request, response: Response) => {
    const payment: PaymentRequestMutationType = request.body

    try {
        if (
            !payment.orderId ||
            !payment.method ||
            !payment.currency ||
            !payment.amount ||
            !payment.card
        )
            response
                .status(400)
                .json({ status: 'failure', errorMessage: 'Missing parameters' })
    } catch (error: unknown) {
        console.table(error)
        response
            .status(500)
            .json({ status: 'failure', errorMessage: 'Server error' })
    }
})
