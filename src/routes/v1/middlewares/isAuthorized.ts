import { ServerResponse, IncomingMessage } from 'http'
import { extractToken, decodeToken, verifyToken } from '../../../utils/authUtils'
import User from '../../../entity/User'
import { nextCallback } from 'fastify-plugin'
import { AppInstance } from '../../../'
import { getModelForClass } from '@typegoose/typegoose'

const defaultMethods = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

export default (connection, methods = defaultMethods) =>
  async function (this: AppInstance, req: IncomingMessage, res: ServerResponse, next: nextCallback) {
    if (methods.includes(req.method)) {
      const userModel = getModelForClass(User, { existingConnection: connection })
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
        res.setHeader('content-type', 'application/json; charset=utf-8')
        res.statusCode = 401
        res.end(
          JSON.stringify({
            data: {},
            success: false,
            error: 'Unauthorized',
          })
        )
      }
    }

    return next()
  }
