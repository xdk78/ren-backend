import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import authLoginSchema from '../../../schema/auth/authLoginSchema'
import authRegisterSchema from '../../../schema/auth/authRegisterSchema'
import AuthService from '../../../services/AuthService'
import isAuthorized from '../middlewares/isAuthorized'
import { AppInstance } from '../../../'
import { USER_404_MESSAGE } from '../../../utils/error_messages'

export default async (fastify: AppInstance) => {
  const authService = new AuthService(fastify)
  const db = fastify.mongo.db

  fastify.post(
    '/auth/login',
    { schema: authLoginSchema },
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json').code(200)
        return await authService.login(request.body.username, request.body.password)
      } catch (error) {
        if (error.message === USER_404_MESSAGE) {
          reply.status(404)
        }
        return {
          error: error.message
        }
      }
    }
  )
  fastify.use('/auth/logout', isAuthorized(db, ['GET']))
  fastify.get('/auth/logout', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      // @ts-ignore
      const data = await authService.logout(request.raw.user._id)

      return data
    } catch (error) {
      return {
        data: {},
        error: error.message
      }
    }
  })

  fastify.post(
    '/auth/register',
    { schema: authRegisterSchema },
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      try {
        reply.header('Content-Type', 'application/json').code(201)
        return await authService.register({
          username: request.body.username,
          email: request.body.email,
          password: request.body.password
        } as User)
      } catch (error) {
        return {
          data: {},
          error: error.message
        }
      }
    }
  )

  fastify.use('/auth/verify', isAuthorized(db, ['GET']))
  fastify.get('/auth/verify', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)

    return {
      data: {}
    }
  })
  return
}
