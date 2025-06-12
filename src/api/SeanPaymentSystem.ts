type PaymentRequestType = {
    amount: number
    currency: string
    invoiceId: string
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
