import Series from '../../../entity/series/Series'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import createSeriesSchema from '../../../schema/series/createSeriesSchema'
import SeriesService from '../../../services/SeriesService'
import isAuthorized from '../../v1/middlewares/isAuthorized'
import Category from '../../../entity/series/Category'

export default async (fastify: FastifyInstance, opts) => {
  const seriesService = new SeriesService(fastify)
  // @ts-ignore
  const db = fastify.mongo.db
  fastify.use('/series', isAuthorized(db, ['POST', 'PATCH']))

  fastify.get('/series', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      return await seriesService.getSeries()
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })
  fastify.get('/series/:id', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const id = request.params.id
      return await seriesService.getSeriesById(id)
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })

  fastify.post('/series', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(201)
      return await seriesService.createSeries({
        title: request.body.title,
        description: request.body.description,
        category: request.body.category,
      } as Series)
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })
  fastify.patch('/series/:id', { schema: createSeriesSchema }, async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      return await seriesService.updateSeries(request.params.id, {
        title: request.body.title,
        description: request.body.description,
        category: request.body.category,
      } as Series)
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })

  fastify.post('/series/category', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(201)
      return await seriesService.createCategory(request.body.name)
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })

  fastify.post('/series/episode', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(201)
      return await seriesService.createEpisode(request.body.title, request.body.number)
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })

  fastify.post('/series/season', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(201)
      return await seriesService.createSeason(request.body.number, request.body.episodes)
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })

  fastify.post('/series/genre', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(201)
      return await seriesService.createGenre(request.body.name)
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error.message,
      }
    }
  })
  return
}
