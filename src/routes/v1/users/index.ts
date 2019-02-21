import search from './search'
import { FastifyInstance } from 'fastify'
import watchList from './watchList'

export default async (fastify: FastifyInstance) => {
  fastify.register(search)
  fastify.register(watchList)
}
