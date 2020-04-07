import jwt from 'jsonwebtoken'
import base64 from 'base64url'
import crypto from 'crypto'
import { IncomingMessage } from 'http'

/**
 * Generates a JSON Web Token for a given user id and user secret.
 *
 * @param  {string} userSecret User secret
 * @param  {string} id
 * @param  {number} expires    Expiration date (in ms)
 * @return {string}            Signed JSON Web Token
 */
export function generateToken(userSecret: string, id: string, expires = 3600): string {
  const serverSecret = String(process.env.API_JWT_SECRET_TOKEN)
  const tokenSecret = `${userSecret}@${serverSecret}`

  return jwt.sign({ id: id }, tokenSecret, {
    expiresIn: Math.floor(Date.now() / 1000) + expires,
  })
}

/**
 * Decodes a given JWT and returns its header, payload and signature.
 *
 * @note   If a token is invalid, JSON will throw an exception, so don't forget to catch exceptions
 * @note   At this time, those exceptions should be handled by our middleware
 *
 * @param  {string} token Encoded JSON Web Token
 * @return {Object}       Decoded JSON Web Token
 * @throws {Error}        When cannot decode
 */
export function decodeToken(token: string) {
  const encodedToken = token.split('.')

  return {
    header: JSON.parse(base64.decode(encodedToken[0])),
    payload: JSON.parse(base64.decode(encodedToken[1])),
    signature: encodedToken[2],
  }
}

/**
 * Extracts Bearer token from request:
 * - `Authorization` header;
 *
 * @param  {IncomingMessage} req IncomingMessage
 * @return {string}              Encoded JSON Web Token
 */
export function extractToken(req: IncomingMessage): string {
  const header = req.headers.authorization.split(' ')
  const token = header[1]
  return token
}

/**
 * Generates a random string of a given `length`.
 *
 * @param  {number} length Length of the random string to generate
 * @return {string}        Generated random string
 */
export function getRandomString(length = 32): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

/**
 * Verify token.
 *
 * @param  {string}  token Token that will be verified
 * @return {Promise}
 */
export function verifyToken(token: string, secret: string): Promise<string | object> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}
