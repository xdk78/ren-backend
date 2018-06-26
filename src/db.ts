import 'reflect-metadata'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'

function plugin(fastify: FastifyInstance, options) {
  return mongoose.createConnection('mongodb://localhost:27017/senren_dev').then(connection => {
    fastify.decorate('db', connection)
  }).catch(error => console.log(error))
}

module.exports = fp(plugin)
