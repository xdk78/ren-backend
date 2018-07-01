import dotenv from 'dotenv-safe'
let envConfig = {}
if (process.env.NODE_ENV === 'production') {
  envConfig = { path: './.env.production' }
} else if (process.env.NODE_ENV === 'test') {
  envConfig = { path: './.env.test' }
} else {
  envConfig = { path: './.env' }
}
dotenv.config(Object.assign({}, { allowEmptyValues: true, example: './.env.example' }, envConfig))
import { dbConnURI } from './utils'
import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import { Server, IncomingMessage, ServerResponse, ServerRequest } from 'http'
import db from './db'
import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import bearerAuth from 'fastify-bearer-auth'
import session from 'fastify-session'
import cookie from 'fastify-cookie'
const mongoStore = require('connect-mongodb-session')(session)
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
// @ts-ignore
server.addHook('onRequest', (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>, next) => {
  // @ts-ignore
  request.connection.encrypted = true
  next()
})
server.register(cookie)
server.register(session, {
  secret: process.env.API_SESSION_SECRET_TOKEN,
  store: new mongoStore({
    uri: dbConnURI,
    collection: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,  // 1 week
  },
})

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
