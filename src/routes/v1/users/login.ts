import User from '../../../entity/User'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'

export default async (fastify, opts, next) => {
  const db = fastify.mongo.db

  fastify.post('/users/login', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const user = await userModel.findOne({
        username: request.body.username,
        password: request.body.password,
      })

      return reply.send({
        data: { message: 'Login success', id: user._id }, // TODO: return token here
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
