import User from '../../../entity/User'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'

export default async (fastify, opts, next) => {
  const db = fastify.mongo.db

  fastify.post('/users/register', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const user = new userModel(
        {
          username: request.body.username,
          email: request.body.email,
          password: request.body.password, // TODO: hash this
          createdAt: new Date().toISOString(),
        },
      )

      await user.save()

      return reply.send({
        data: { message: 'Registered new user ' },
        error: '',
      })
    } catch (error) {
      return reply.send({
        data: {},
        error: error.message,
      })
    }
  })
  next()
}
