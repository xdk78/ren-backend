import jwt from 'jsonwebtoken'
import base64 from 'base64url'
import crypto from 'crypto'
import { FastifyRequest } from 'fastify'
import { IncomingMessage } from 'http'

/**
 * Generates a JSON Web Token for a given user id and user secret.
 *
 * @param  {string}  userSecret          User secret
 *  @param {string} id
 * @param  {number}     expires         Expiration date (in ms)
 * @return {string}                     Signed JSON Web Token
 */
export function generateToken(
  userSecret: string,
  id: string,
  expires: number = 3600,
): string {
  const serverSecret = String(process.env.API_JWT_SECRET_TOKEN)
  const tokenSecret = `${userSecret}@${serverSecret}`

  return jwt.sign({ id: id }, tokenSecret, {
    expiresIn: Math.floor(Date.now() / 1000) + expires,
  })
}

/**
 * Decodes a given JWT and returns its header, payload and signature.
 *
 * @note    If a token is invalid, JSON will throw an exception, so don't forget
 *          to catch exceptions
 *
 * @note    At this time, those exceptions should be handled by our inra-error
 *          middleware
 *
 * @param  {string}   token       Encoded JSON Web Token
 * @return {Object}               Decoded JSON Web Token
 * @throws {Error}                When cannot decode
 */
export function decodeToken(token: string): Object {
  const encodedToken = token.split('.')

  return {
    header: JSON.parse(base64.decode(encodedToken[0])),
    payload: JSON.parse(base64.decode(encodedToken[1])),
    signature: encodedToken[2],
  }
}

/**
 * Extracts token from Fastify request:
 * - `Authorization` header;
 * - `authorization` query;
 *
 * @param  {FastifyRequest}   req     FastifyRequest
 * @return {string}                   Encoded JSON Web Token
 */
export function extractToken(req: FastifyRequest<IncomingMessage>): string {

  return req.headers.authorization || req.query.authorization
}
/**
 * Generates a random string of a given `length`.
 *
 * @param   {number}  length    Length of the random string to generate
 * @return  {string}            Generated random string
 */
export function getRandomString(length: number = 32): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}
