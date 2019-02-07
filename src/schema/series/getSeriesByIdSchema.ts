import { RouteSchema } from 'fastify'

export default {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    additionalProperties: false
  },
  headers: {
    type: 'object',
    properties: {
      // tslint:disable-next-line:object-literal-key-quotes
      Authorization: { type: 'string' }
    },
    required: ['Authorization']
  }
} as RouteSchema
