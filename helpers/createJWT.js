import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: 'config.env' })

const secretKey = process.env.SECRET_KEY

export default function createJWT(user) {

    const token = jwt.sign({
        data: user.password
    }, secretKey, { expiresIn: '1h' });

    return token
}
