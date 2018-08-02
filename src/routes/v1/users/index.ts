import search from './search'
import { FastifyInstance } from 'fastify'
import watchList from './watchList'

export default async (fastify: FastifyInstance, opts) => {
  fastify.register(search)
  fastify.register(watchList)
}
