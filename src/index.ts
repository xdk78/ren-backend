import dotenv from 'dotenv-flow'
dotenv.config()
import fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import db from './db'
import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import bearerAuth from 'fastify-bearer-auth'
import jwt from 'fastify-jwt'
import index from './routes/v1/'
import series from './routes/v1/series'
import users from './routes/v1/users'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

const PORT = process.env.API_PORT || 5000
const HOST = process.env.API_HOST || '0.0.0.0'

const keys = new Set([process.env.API_BEARER_SECRET_TOKEN])

server.register(db).ready()
server.register(helmet)
server.register(compress)
server.register(bearerAuth, { keys })
server.register(jwt, {
  secret: process.env.API_JWT_SECRET_TOKEN,
}), err => {
  if (err) throw err
}

// API Routing
server.register(index, { prefix: '/v1' })
server.register(series, { prefix: '/v1' })
server.register(users, { prefix: '/v1' })

server.get('/', (request, reply) => {
  reply.redirect(302, '/v1')
})

server.listen(PORT as number, HOST, (err) => {
  if (err) throw err
  // @ts-ignore
  console.log(`Senren api is listening on ${server.server.address().address}:${server.server.address().port}`)
})

export default () => server
