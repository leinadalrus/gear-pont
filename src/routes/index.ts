import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'

import { authRouter } from './auths'
import { prodRouter } from './products'

const app = express()
const port = process.env['SRV_PORT']

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: 4000 }))
app.use(
    session({
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored

        secret: `${process.env['SECRET_KEY']}`,
        cookie: { secure: true }
    })
)

app.use('/', authRouter)
app.use('/products', prodRouter)

app.listen(port, () => {
    console.log(`Daniel's server is listening on port:\t${port}`)
})

dotenv.config()
