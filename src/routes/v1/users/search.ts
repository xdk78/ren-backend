import User from '../../../entity/User'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'

export default async (fastify, opts) => {
  const db = fastify.mongo.db

  fastify.get('/users', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const users = await userModel.find()
      const output = users.map(user => ({
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        series: user.series,
        avatar: user.avatar,
      }),
      )

      return {
        data: output,
        error: '',
      }
    } catch (error) {
      return {
        data: [],
        error: error.message,
      }
    }
  })
  fastify.get('/users/:id', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
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
        avatar: user.avatar,
      }

      return {
        data: output,
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
