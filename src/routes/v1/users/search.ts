import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db

  fastify.get('/users', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      // @ts-ignore
      const userId = request.session.userId

      if (userId) {
        const userModel = new User().getModelForClass(User, { existingConnection: db })
        const user = await userModel.findOne({ _id: userId })

        const output = {
          _id: user._id,
          username: user.username,
          createdAt: user.createdAt,
          avatar: user.avatar,
          watchListId: user.watchList,
          seriesStates: user.seriesStates,
        }

        reply.send({
          data: output,
          error: '',
        })
      } else {
        throw new Error('User is not logged in')
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
      if (user) {
        const output = {
          _id: user._id,
          username: user.username,
          createdAt: user.createdAt,
          avatar: user.avatar,
          watchListId: user.watchList,
          seriesStates: user.seriesStates,
        }

        reply.send({
          data: output,
          error: '',
        })
      } else {
        throw new Error('Couldn\'t find user')
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
