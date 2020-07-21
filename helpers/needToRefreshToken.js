import jwt from 'jsonwebtoken'
import getSecretKey from './getSecretKey.js'

/**
 * @function needToRefreshToken | Used to check if the token is older than half its expirey time
 * @param {String} token | Token from local strorage
 * @returns {Boolean} | true or false if token is older than half expirey time
 */

export default async function needToRefreshToken(token) {
    try {
        const validToken = await jwt.verify(token, getSecretKey())

        const created = validToken.iat * 1000

        // get expirey time
        const exp = validToken.exp * 1000

        // get difference between created and expirey time
        const dif = exp - created

        // get half of time difference
        const halfExp = created + (dif / 2)
        const now = new Date().getTime()

        // if passed half way of expired time return true, token needs to be refreshed
        if (now > halfExp && now < exp) {
            return true
        } else {
            return false
        }

    } catch (err) {
        return err
    }
}