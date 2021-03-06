import Series from '../../../entity/series/Series'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import SeriesService from '../../../services/SeriesService'
import isAuthorized from '../../v1/middlewares/isAuthorized'
import { AppInstance } from '../../../'

export default async (fastify: AppInstance) => {
  const seriesService = new SeriesService(fastify)
  const db = fastify.mongo.db
  fastify.use('/series', isAuthorized(db, ['POST', 'PATCH']))

  fastify.get('/series', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
      return await seriesService.getSeries()
    } catch (error) {
      return {
        data: {},

        error: error.message,
      }
    }
  })
  fastify.get('/series/:id', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
      const id = request.params.id
      return await seriesService.getSeriesById(id)
    } catch (error) {
      return {
        data: {},

        error: error.message,
      }
    }
  })

  fastify.post('/series', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(201)
      return await seriesService.createSeries({
        title: request.body.title,
        description: request.body.description,
        category: request.body.category,
      } as Series)
    } catch (error) {
      return {
        data: {},

        error: error.message,
      }
    }
  })

  fastify.patch(
    '/series/:id',
    // { schema: createSeriesSchema },
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
        return await seriesService.updateSeries(request.params.id, {
          title: request.body.title,
          description: request.body.description,
          category: request.body.category,
        } as Series)
      } catch (error) {
        return {
          data: {},

          error: error.message,
        }
      }
    }
  )

  fastify.post(
    '/series/categories',
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(201)
        return await seriesService.createCategory(request.body.name)
      } catch (error) {
        return {
          data: {},
          error: error.message,
        }
      }
    }
  )

  fastify.get(
    '/series/categories',
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
        return await seriesService.getCategories()
      } catch (error) {
        return {
          data: {},
          error: error.message,
        }
      }
    }
  )

  fastify.post(
    '/series/episodes',
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json; charset=utf-8').code(201)
        return await seriesService.createEpisode(request.body.title, request.body.number)
      } catch (error) {
        return {
          data: {},
          error: error.message,
        }
      }
    }
  )

  fastify.post('/series/seasons', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(201)
      return await seriesService.createSeason(request.body.number, request.body.episodes)
    } catch (error) {
      return {
        data: {},

        error: error.message,
      }
    }
  })

  fastify.post('/series/genres', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(201)
      return await seriesService.createGenre(request.body.name)
    } catch (error) {
      return {
        data: {},

        error: error.message,
      }
    }
  })

  fastify.get('/series/genres', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
      return await seriesService.getGenres()
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })

  return
}
