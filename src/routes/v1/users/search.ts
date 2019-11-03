import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import UsersService from '../../../services/UsersService'
import isAuthorized from '../middlewares/isAuthorized'
import { AppInstance } from '../../../'
import { USER_404_MESSAGE } from '../../../utils/error_messages'

export default async (fastify: AppInstance) => {
  const db = fastify.mongo.db
  const usersService = new UsersService(fastify)
  fastify.use('/users', isAuthorized(db, ['GET']))
  fastify.get('/users', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
      // @ts-ignore
      return await usersService.getUser(request.raw.user._id)
    } catch (error) {
      return {
        error: error.message
      }
    }
  })
  fastify.get('/users/:id', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json; charset=utf-8').code(200)
      return await usersService.getUser(request.params.id)
    } catch (error) {
      if (error.message === USER_404_MESSAGE) {
        reply.status(404)
      }
      return {
        error: error.message
      }
    }
  })
  return
}
