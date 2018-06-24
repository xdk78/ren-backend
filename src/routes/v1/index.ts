module.exports = async (fastify, opts, next) => {
  fastify.get('/', opts, async (req, reply) => {
    reply.header('Content-Type', 'application/json').code(200)
    return {
      data: `Api say Hello`,
      error: '',
    }
  })
  next()
}
