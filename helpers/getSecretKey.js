import dotenv from 'dotenv'

dotenv.config({ path: 'config.env' })

export default function () {
    return process.env.SECRET_KEY
}