import { RouteSchema } from 'fastify'

export default {
  body: {
    type: 'object',
    properties: {
      password: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string' },
    },
    additionalProperties: false,
    required: ['password', 'username', 'email'],
  },
} as RouteSchema
