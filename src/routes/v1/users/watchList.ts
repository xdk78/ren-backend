import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import WatchListSerivce from '../../../services/WatchListService'
import modifyWatchListSchema from '../../../schema/watchlist/modifyWatchListSchema'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db
  const watchListService = new WatchListSerivce(fastify)

  fastify.get('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)

      const watchList = await watchListService.getWatchList(request.params.id)

      reply.send({
        data: watchList,
        error: '',
      })
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  },
  )

  fastify.post('/users/:id/watchlist',  { schema: modifyWatchListSchema }, async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      // @ts-ignore
      const userId = request.session.userId

      if (userId) {
        const watchList = await watchListService.addToWatchList(request.body.status, userId, request.body)
        reply.send({
          data: watchList,
          error: '',
        })
      } else {
        throw new Error('User is not logged in')
      }
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })

  fastify.delete('/users/:id/watchlist', { schema: modifyWatchListSchema }, async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      // @ts-ignore
      const userId = request.session.userId

      if (userId) {
        const status = request.body.status
        const seriesState = request.body.seriesState
        const watchList = await watchListService.removeFromWatchList(request.params.id, request.body.status, request.body.seriesState)
        reply.send({
          data: request.body.seriesState,
          error: '',
        })
      } else {
        throw new Error('User is not logged in')
      }
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  },
  )
  return
}
