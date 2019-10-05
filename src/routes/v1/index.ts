import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import { AppInstance } from '../../'

export default async (fastify: AppInstance, opts) => {
  fastify.get('/', opts, async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
    return {
      data: { message: 'Api say Hello' }
    }
  })
  return
}
