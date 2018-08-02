import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import UserService from '../../../services/UserService'
import isAuthorized from '../middlewares/isAuthorized'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db
  const userService = new UserService(fastify)
  fastify.use('/users', isAuthorized(db, ['GET']))
  fastify.get('/users', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      // @ts-ignore
      const result = await userService.fetchUser(request.raw.user._id)

      reply.send({
        data: result,
        error: '',
      })

    } catch (error) {
      return {
        data: [],
        error: error.message,
      }
    }
  })
  fastify.get('/users/:id', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const result = await userService.fetchUser(request.params.id)
      if (result) {

        reply.send({
          data: result,
          error: '',
        })
      } else {
        throw new Error('Couldn\'t find user')
      }
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })
  return
}
