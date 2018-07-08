import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import * as bcrypt from 'bcrypt'
import bearerAuth from 'fastify-bearer-auth'
const keys = new Set([process.env.API_BEARER_SECRET_TOKEN])

export default async (fastify: FastifyInstance, opts) => {
  fastify.register(bearerAuth, { keys })
  // @ts-ignore
  const db = fastify.mongo.db

  fastify.post('/auth/login', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const userFromDb = await userModel.findOne({
        username: request.body.username,
      })

      if (await bcrypt.compare(request.body.password, userFromDb.password)) {
        // @ts-ignore
        request.session.userId = userFromDb.id
        reply.send({
          data: { message: 'Login success', _id: userFromDb._id },
          error: '',
        })
      } else {
        throw new Error('Wrong password')
      }
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })

  fastify.get('/auth/logout', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)

      // @ts-ignore
      const session = request.session

      session.userId = null

      // @ts-ignore
      request.sessionStore.destroy(session.sessionId, null)
      reply.send({
        data: { message: 'Logged out' },
        error: '',
      })
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })
  return
}
