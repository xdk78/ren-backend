import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import * as bcrypt from 'bcrypt'

export default async (fastify: FastifyInstance, opts) => {
    // @ts-ignore
  const db = fastify.mongo.db
  const saltRounds = 10

  fastify.post('/users/register', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const user = new userModel(
        {
          username: request.body.username,
          email: request.body.email,
          password: await bcrypt.hash(request.body.password, saltRounds),
          createdAt: new Date().toISOString(),
        },
      )

      await user.save()

      return {
        data: { message: 'Register success' },
        error: '',
      }
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })
  return
}
