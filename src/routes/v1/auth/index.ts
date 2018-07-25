import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import bearerAuth from 'fastify-bearer-auth'
import authLoginSchema from '../../../schema/auth/authLoginSchema'
import authRegisterSchema from '../../../schema/auth/authRegisterSchema'
import AuthService from '../../../services/AuthService'
import isAuthorized from '../middlewares/isAuthorized'
import request from 'supertest'
const keys = new Set([process.env.API_BEARER_SECRET_TOKEN])

export default async (fastify: FastifyInstance, opts) => {
  const authService = new AuthService(fastify)

  fastify.post('/auth/login', { schema: authLoginSchema }, async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      return await authService.login(request, request.body.username, request.body.password)
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })
  // @ts-ignore
  fastify.use('/auth/logout', isAuthorized(fastify.mongo.db))
  fastify.get('/auth/logout', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    try {
        // @ts-ignore
      const data = await authService.logout(request.raw.root._id)

      return data
    } catch (error) {
      throw error
    }
  })

  fastify.post('/auth/register', { schema: authRegisterSchema }, async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      return await authService.register({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
      } as User)

    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })
  return
}
