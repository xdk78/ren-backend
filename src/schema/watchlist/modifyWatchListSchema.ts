import { RouteSchema } from 'fastify'

export default {
  body: {
    type: 'object',
    properties: {
      status: { type: 'number' },
      seriesId: { type: 'string' },
      episodeNumber: { type: 'number' },
      seasonNumber: { type: 'number' }
    },

    additionalProperties: false,
    required: ['status', 'seriesId']
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  }
} as RouteSchema
