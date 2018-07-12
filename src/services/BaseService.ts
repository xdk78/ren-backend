import { FastifyInstance } from 'fastify'

export default interface BaseService {
  connection: any
  fastify: FastifyInstance
}
