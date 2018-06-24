import { Series } from '../../../entity/Series'

module.exports = async (fastify, opts, next) => {
  const db = fastify.db

  fastify.get('/series', async (request, reply) => {
    try {
      const loadedSeries = await db.mongoManager.find(Series)
      return {
        data: {
          series: loadedSeries,
        },
        error: '',
      }
    } catch (error) {
      return {
        data: {
          series: [],
        },
        error: error.message,
      }
    }
  })
  fastify.post('/series', async (request, reply) => {
    try {
      const series = new Series()
      series.title = request.body.title
      series.episodes = request.body.episodes
      await db.mongoManager.save(series)

      return {
        data: 'Added new series ',
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
