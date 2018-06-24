const fastify = require('fastify')()
const PORT = process.env.PORT || 5000

fastify.register(require('./db')).ready()
fastify.register(require('fastify-helmet'))

// API Routing
fastify.register(require('./routes/v1/'), { prefix: '/v1' })
fastify.register(require('./routes/v1/series'), { prefix: '/v1' })

fastify.get('/', (request, reply) => {
  reply.redirect(302, '/v1')
})

fastify.listen(PORT, '0.0.0.0', (err) => {
  if (err) throw err
  console.log(`Senren api is listening on ${fastify.server.address().port}`)
})
module.exports = fastify
