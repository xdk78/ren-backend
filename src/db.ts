import 'reflect-metadata'
import { createConnection } from 'typeorm'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'

function plugin(fastify: FastifyInstance, options) {
  return createConnection().then(async connection => {
    fastify.decorate('db', connection)
  }).catch(error => console.log(error))

}

module.exports = fp(plugin)
