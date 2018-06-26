import Series from '../../../entity/Series'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'
import { nextCallback } from 'fastify-plugin'
// import mongoose from 'mongoose'

module.exports = async (fastify, opts, next: nextCallback) => {
  const db = fastify.db

  fastify.get('/series', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    try {
      // const loadedSeries = await db.getModelForClass(Series).find()
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: db })
      const loadedSeries = await seriesModel.find()

      return reply.send({
        data: {
          series: loadedSeries,
        },
        error: '',
      })
    } catch (error) {
      return reply.send({
        data: {},
        error: error.message,
      })
    }
  })
  fastify.post('/series', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: db })
      const series = new seriesModel(
        {
          title: request.body.title,
          seasons: request.body.seasons,
          rating: request.body.rating,
          genres: request.body.genres,
        },
      )

      await series.save()

      return reply.send({
        data: 'Added new series ',
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
