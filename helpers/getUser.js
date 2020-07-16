import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import getSecretKey from './getSecretKey.js';

/**
 * @function - Checks valid token from client
 * @param {String} token - Token passed from client
 * @return {User}
 */

export default async function (token) {
    try {
        // check token is still valid
        const validToken = await jwt.verify(token, getSecretKey());

        // TODO: check expiration time on token
        // if expiration time is less than half, send refreshed token back

        // get user from database from valid token
        const user = User.findOne({ username: validToken.data.username })
        return user
    } catch (err) {
        // if token is expired, return expired
        if (err.name === 'TokenExpiredError') {
            return 'expired'
        }

        // return undefined if any other error
        return undefined
    }
}