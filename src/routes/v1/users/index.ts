import search from './search'
import bearerAuth from 'fastify-bearer-auth'
import { FastifyInstance } from 'fastify'
import watchList from './watchList'
const keys = new Set([process.env.API_BEARER_SECRET_TOKEN])

export default async (fastify: FastifyInstance, opts) => {
  fastify.register(search)
  fastify.register(watchList)
}
