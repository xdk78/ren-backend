import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import { extractToken, decodeToken } from '../../../utils/authUtils'
import User from '../../../entity/User'

import jwt from 'jsonwebtoken'
export default (connection) => async function (req: FastifyRequest<IncomingMessage>, res: FastifyReply<ServerResponse>, next: Function) {
  const token = extractToken(req)
  const payload = decodeToken(token)

  const userModel = new User().getModelForClass(User, { existingConnection: connection })
  // @ts-ignore
  const user = await userModel.findById(payload.id)
  // @ts-ignore
  const secret = `${payload.secret}@${String(process.env.AUTH_SECRET)}`

  return jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      throw new Error(error.message)
    }

    // Populate context with user data:
    // @ts-ignore
    req.user = payload
    // @ts-ignore
    req.token = decoded

    return next()
  })
}
