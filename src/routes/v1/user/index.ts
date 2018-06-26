import User from '../../../entity/User'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'
import { nextCallback } from 'fastify-plugin'

module.exports = async (fastify, opts, next: nextCallback) => {
  const db = fastify.db

  fastify.post('/user/register', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const user = new userModel(
        {
          username: request.body.username,
          email: request.body.email,
          password: request.body.password, // TODO: hash this
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
  fastify.post('/user/login', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const user = await userModel.findOne({
        username: request.body.username,
        password: request.body.password,
      }) as any

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
  fastify.get('/user/:id', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const user = await userModel.findOne({
        _id: request.params.id,
      })

      return reply.send({
        data: { user },
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
