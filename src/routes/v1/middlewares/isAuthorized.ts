import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import { extractToken, decodeToken, verifyToken } from '../../../utils/authUtils'
import User from '../../../entity/User'

const defaultMethods = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

export default (connection, methods = defaultMethods) => async function (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>, next: any) {
  if (methods.includes(request.req.method)) {
    const token = extractToken(request)
    const payload = decodeToken(token)  as any
    const userModel = new User().getModelForClass(User, { existingConnection: connection })
    try {
      const user = await userModel.findById(payload.payload.id)
      const secret = `${user.secret}@${String(process.env.API_JWT_SECRET_TOKEN)}`
      const data = await verifyToken(token, secret)
      // @ts-ignore
      request.root = user
      // @ts-ignore
      request.token = data

      return next()
    } catch (error) {
      reply.header('content-type', 'application/json')
      reply.status(401)
      reply.send({
        error: 'Unauthorized',
      })
    }
  }

  return next()

}
