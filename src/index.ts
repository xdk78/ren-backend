import fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

const PORT = process.env.PORT || 5000

server.register(require('./db')).ready()
server.register(require('fastify-helmet'))
server.register(require('fastify-compress'))

// API Routing
server.register(require('./routes/v1/'), { prefix: '/v1' })
server.register(require('./routes/v1/series'), { prefix: '/v1' })

server.get('/', (request, reply) => {
  reply.redirect(302, '/v1')
})

server.listen(PORT as number, '0.0.0.0', (err) => {
  if (err) throw err
  // @ts-ignore
  console.log(`Senren api is listening on ${server.server.address().address}:${server.server.address().port}`)
})
module.exports = fastify
