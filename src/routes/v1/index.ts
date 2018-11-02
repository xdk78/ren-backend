import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'

export default async (fastify: FastifyInstance, opts) => {
  fastify.get('/', opts, async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    return {
      data: { message: 'Api say Hello' },
    }
  })
  return
}
