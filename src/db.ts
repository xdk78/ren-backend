import 'reflect-metadata'
import { createConnection } from 'typeorm'
import fp from 'fastify-plugin'

function plugin(fastify, options) {
  return createConnection().then(async connection => {
    fastify.decorate('db', connection)
  }).catch(error => console.log(error))

}

module.exports = fp(plugin)
