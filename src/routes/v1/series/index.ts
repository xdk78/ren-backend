import { Series } from '../../../entity/Series'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'
import { nextCallback } from 'fastify-plugin'

module.exports = async (fastify, opts, next: nextCallback) => {
  const db = fastify.db

  fastify.get('/series', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    try {
      const loadedSeries = await db.mongoManager.find(Series)
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
      const series = new Series()

      series.title = request.body.title
      series.seasons = request.body.seasons
      series.rating = request.body.rating
      series.genres = request.body.genres

      await db.mongoManager.save(series)

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
