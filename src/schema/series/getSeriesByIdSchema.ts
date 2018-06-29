import { RouteSchema } from 'fastify'

export default {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  additionalProperties: false,
} as RouteSchema
