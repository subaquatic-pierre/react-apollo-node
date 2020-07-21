import jwt from 'jsonwebtoken'
import getSecretKey from './getSecretKey.js'

const secretKey = getSecretKey()

/**
 * @function createJWT
 * @param {User} user | User model
 * @returns {JWT} | Representing serialized user data
 */

export default function createJWT(user) {
    try {
        const token = jwt.sign({
            data: user
        }, secretKey, { expiresIn: '6hr' });
        return token
    } catch (err) {
        throw new Error(err)
    }
}
