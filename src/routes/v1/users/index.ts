import User from '../../../entity/User'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'

module.exports = async (fastify, opts, next) => {
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
  fastify.get('/users/:id', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const user = await userModel.findOne({
        _id: request.params.id,
      })
      const output = {
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        series: user.series,
      }
      return reply.send({
        data: output,
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
