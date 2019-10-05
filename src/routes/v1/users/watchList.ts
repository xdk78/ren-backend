import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import WatchListSerivce from '../../../services/WatchListService'
import isAuthorized from '../middlewares/isAuthorized'
import { AppInstance } from '../../../'

export default async (fastify: AppInstance) => {
  const db = fastify.mongo.db
  const watchListService = new WatchListSerivce(fastify)

  fastify.use('/users/:id/watchlist', isAuthorized(db, ['GET']))
  fastify.use('/users/watchlist', isAuthorized(db, ['GET', 'DELETE', 'POST', 'PATCH']))

  fastify.get(
    '/users/:id/watchlist',
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(200)

        const watchList = await watchListService.getWatchList(request.params.id)

        return {
          data: watchList
        }
      } catch (error) {
        return {
          error: error.message
        }
      }
    }
  )

  fastify.get('/users/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
      // @ts-ignore
      const id = request.raw.user._id
      const watchList = await watchListService.getWatchList(id)

      return {
        data: watchList
      }
    } catch (error) {
      return {
        error: error.message
      }
    }
  })

  fastify.post(
    '/users/watchlist',
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
        // @ts-ignore
        const id = request.raw.user._id
        const status = request.body.status
        const seriesState = request.body.seriesState

        await watchListService.addToWatchList(id, status, seriesState)
        return {
          data: {}
        }
      } catch (error) {
        return {
          error: error.message
        }
      }
    }
  )

  fastify.delete(
    '/users/watchlist',
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
        // @ts-ignore
        const id = request.raw.user._id
        const status = request.body.status
        const seriesStateId = request.body.seriesStateId
        await watchListService.removeFromWatchList(id, status, seriesStateId)
        return {
          data: {}
        }
      } catch (error) {
        return {
          error: error.message
        }
      }
    }
  )

  fastify.patch(
    '/users/watchlist',
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
        // @ts-ignore
        const id = request.raw.user._id
        const status = request.body.status
        const seriesStateId = request.body.seriesStateId
        const seriesState = request.body.seriesState

        const data = await watchListService.updateWatchList(id, status, seriesStateId, seriesState)
        return {
          data: data
        }
      } catch (error) {
        return {
          error: error.message
        }
      }
    }
  )

  return
}
