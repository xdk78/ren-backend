import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'

export default async (fastify: FastifyInstance, opts, next) => {
  fastify.get('/', opts, async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    return reply.send({
      data: { message: 'Api say Hello' },
      error: '',
    })
  })
  next()
}
