import dotenv from 'dotenv'

dotenv.config({path: `.env.${process.env.NODE_ENV}` })

const APPS = {
    ENV: process.env.ENV,
    PORT: process.env.PORT
}

const DB = {
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PASS: process.env.DB_PASS
}


export {APPS, DB}