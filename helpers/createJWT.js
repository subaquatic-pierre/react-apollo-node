import jwt from 'jsonwebtoken'
import getSecretKey from './getSecretKey.js'

const secretKey = getSecretKey()

export default function createJWT(user) {
    try {
        const token = jwt.sign({
            data: user
        }, secretKey, { expiresIn: '1h' });
        return token
    } catch (err) {
        throw new Error(err)
    }
}
