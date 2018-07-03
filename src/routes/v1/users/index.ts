import login from './login'
import register from './register'
import search from './search'
import bearerAuth from 'fastify-bearer-auth'
import { FastifyInstance } from 'fastify'
const keys = new Set([process.env.API_BEARER_SECRET_TOKEN])

export default async (fastify: FastifyInstance, opts) => {
  fastify.register(bearerAuth, { keys })
  fastify.register(login)
  fastify.register(register)
  fastify.register(search)
  return
}
