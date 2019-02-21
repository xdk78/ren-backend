import { FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import { extractToken, decodeToken, verifyToken } from '../../../utils/authUtils'
import User from '../../../entity/User'
import { nextCallback } from 'fastify-plugin'

const defaultMethods = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

export default (connection, methods = defaultMethods) =>
  async function(this: FastifyInstance, req: IncomingMessage, res: ServerResponse, next: nextCallback) {
    if (methods.includes(req.method)) {
      const userModel = new User().getModelForClass(User, { existingConnection: connection })
      try {
        const token = extractToken(req)
        const payload = decodeToken(token) as any
        const user = await userModel.findById(payload.payload.id)
        const secret = `${user.secret}@${String(process.env.API_JWT_SECRET_TOKEN)}`
        const data = await verifyToken(token, secret)
        // @ts-ignore
        req.user = user
        // @ts-ignore
        req.token = data

        return next()
      } catch (error) {
        res.setHeader('content-type', 'application/json')
        res.statusCode = 401
        res.end(
          JSON.stringify({
            data: {},
            success: false,
            error: 'Unauthorized'
          })
        )
      }
    }

    return next()
  }
