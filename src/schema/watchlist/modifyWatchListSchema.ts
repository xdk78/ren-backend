import { RouteSchema } from 'fastify'

export default {
  body: {
    type: 'object',
    properties: {
      status: { type: 'number' },
      seriesId: { type: 'number' },
    },

    additionalProperties: false,
    required: ['status', 'seriesId'],
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
} as RouteSchema
