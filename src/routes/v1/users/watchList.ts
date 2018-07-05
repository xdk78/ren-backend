import User from '../../../entity/User'
import { ObjectId } from 'bson'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import WatchList from '../../../entity/WatchList'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db

  fastify.get('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: db })

      const user = await userModel.findOne({ _id: request.params.id })

      if (user) {
        const watchList = await watchListModel.findOne({ _id: user.watchList })

        reply.send({
          data: watchList,
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

  fastify.post('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: db })

      const user = await userModel.findOne({ _id: request.params.id })
      if (user) {
        await watchListModel.addToWatching(user.watchList as any, request.body.seriesId)

        reply.send({
          data: user.watchList,
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

  fastify.delete('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: db })

      const user = await userModel.findOne({ _id: request.params.id })
      if (user) {
        await watchListModel.removeFromWatching(user.watchList as any, request.body.seriesId)

        reply.send({
          data: user.watchList,
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
