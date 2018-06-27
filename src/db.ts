import 'reflect-metadata'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'
const objectId = mongoose.Types.ObjectId

function plugin(fastify: FastifyInstance, options, next) {
  return mongoose.createConnection('mongodb://localhost:27017/senren_dev').then(connection => {
    fastify.decorate('mongo', {
      db: connection,
      ObjectId: objectId,
    }).addHook('onClose', (fastify, done) => {
      // @ts-ignore
      fastify.mongo.db.close(done)
    })
  }).catch(error => next(error))
}

module.exports = fp(plugin)
