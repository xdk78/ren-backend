import Series from '../../../entity/Series'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'
import createSeriesSchema from '../../../schema/series/createSeriesSchema'
import getSeriesByIdSchema from '../../../schema/series/getSeriesByIdSchema'

export default async (fastify, opts, next) => {
  const db = fastify.mongo.db

  fastify.get('/series', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: db })
      const loadedSeries = await seriesModel.find()

      return reply.send({
        data: loadedSeries,
        error: '',
      })
    } catch (error) {
      return {
        data: [],
        error: error.message,
      }
    }
  })
  fastify.get('/series/:id', { schema: getSeriesByIdSchema }, async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: db })
      const loadedSeries = await seriesModel.findOne({ _id: request.params.id })

      return reply.send({
        data: loadedSeries,
        error: '',
      })
    } catch (error) {
      return {
        data: [],
        error: error.message,
      }
    }
  })
  fastify.post('/series', { schema: createSeriesSchema }, async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: db })
      const series = new seriesModel(
        {
          title: request.body.title,
          description: request.body.description,
          seasons: request.body.seasons,
          category: request.body.category,
          rating: request.body.rating,
          genres: request.body.genres,
        },
      )

      await series.save()

      return {
        data: { message: 'Added new series ' },
        error: '',
      }
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })
  next()
}
