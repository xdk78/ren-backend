import fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import db from './db'
import index from './routes/v1/'
import series from './routes/v1/series'
import users from './routes/v1/users'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

const PORT = process.env.PORT || 5000

server.register(db).ready()
server.register(require('fastify-helmet'))
server.register(require('fastify-compress'))
server.register(require('fastify-jwt'), {
  secret: 'supersecret',
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

server.listen(PORT as number, '0.0.0.0', (err) => {
  if (err) throw err
  // @ts-ignore
  console.log(`Senren api is listening on ${server.server.address().address}:${server.server.address().port}`)
})

export default () => server
