import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import WatchListSerivce from '../../../services/WatchListService'
import modifyWatchListSchema from '../../../schema/watchlist/modifyWatchListSchema'
import isAuthorized from '../middlewares/isAuthorized'
export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db
  const watchListService = new WatchListSerivce(fastify)

  fastify.use('/users/:id/watchlist', isAuthorized(db, ['GET', 'DELETE', 'POST']))

  fastify.get('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)

      const watchList = await watchListService.getWatchList(request.params.id)

      return {
        data: watchList,
        success: true,
        error: '',
      }
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  },
  )
  fastify.post('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      // @ts-ignore
      const id = request.raw.user._id
      const status = request.body.status
      const seriesState = request.body.seriesState

      await watchListService.addToWatchList(id, status, seriesState)
      return {
        data: {},
        success: true,
        error: '',
      }
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })

  fastify.delete('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const id = request.params.id
      const status = request.body.status
      const seriesState = request.body.seriesState
      await watchListService.removeFromWatchList(id, status, seriesState)
      return {
        data: {},
        success: true,
        error: '',
      }
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  },
  )
  return
}
