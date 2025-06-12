declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPIRATION_TIME: '3700'
            NODE_ENV: 'development' | 'production'
            NOSQL_PW: string
            NOSQL_USR: string
            SALT_ROUNDS: '10'
            SECRET_KEY: string
            SECRET_HASH: string
            SRV_PORT: '3000'
        }
    }
}

export { global }
