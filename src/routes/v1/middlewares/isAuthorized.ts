import jwt from 'jsonwebtoken'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import { extractToken, decodeToken, verifyToken } from '../../../utils/authUtils'
import User from '../../../entity/User'
import { scrypt } from 'crypto'

const defaultMethods = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

export default (connection, methods = defaultMethods) => async function (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>, next: any) {
  // @ts-ignore
  if (methods.includes(request.method)) {
    const token = extractToken(request)
    const payload = decodeToken(token)
    const userModel = new User().getModelForClass(User, { existingConnection: connection })
    try {
      // @ts-ignore
      const user = await userModel.findById(payload.payload.id)
      // @ts-ignore
      const secret = `${user.secret}@${String(process.env.API_JWT_SECRET_TOKEN)}`
      const data = await verifyToken(token, secret)
      // @ts-ignore
      request.root = user
      // @ts-ignore
      request.token = data

      return next()
    } catch (error) {
      // @ts-ignore
      reply.setHeader('content-type', 'application/json')
      // @ts-ignore
      reply.statusCode = 401
      // @ts-ignore
      reply.end(JSON.stringify({
        error: 'Unauthorized',
      }))
    }
  }

  return next()

}
