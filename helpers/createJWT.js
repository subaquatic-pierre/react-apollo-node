import jwt from 'jsonwebtoken'
import getSecretKey from './getSecretKey.js'

const secretKey = getSecretKey()

export default function createJWT(user) {
    try {
        const token = jwt.sign({
            data: user
        }, secretKey, { expiresIn: '15000' });
        return token
    } catch (err) {
        throw new Error(err)
    }
}
