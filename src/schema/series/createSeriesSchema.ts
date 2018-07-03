import { RouteSchema } from 'fastify'

export default {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      seasons: {
        type: 'array',
        properties: {
          number: {
            type: 'number',
          },
          episodes: {
            type: 'array',
            properties: {
              title: { type: 'string' },
              number: { type: 'number' },
            },
          },
        },
      },
      category: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
      rating: { type: 'number' },
      genres: {
        type: 'array',
        properties: {
          name: { type: 'string' },
        },
      },
    },
    additionalProperties: false,
  },
  headers: {
    type: 'object',
    properties: {
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': { type: 'string' },
    },
    required: ['Authorization'],
  },
} as RouteSchema
