import { dbConnURI } from './utils'
import fp, { nextCallback, PluginOptions } from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'
import consola from 'consola'
const objectId = mongoose.Types.ObjectId

function plugin(fastify: FastifyInstance, options: PluginOptions, next: nextCallback) {
  return mongoose
    .createConnection(dbConnURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(connection => {
      fastify
        .decorate('mongo', {
          db: connection,
          ObjectId: objectId
        })
        .addHook('onClose', (fastify, done) => {
          // @ts-ignore
          fastify.mongo.db.close(done)
        })
      consola.success('Connected to database')
    })
    .catch(error => {
      consola.error(error)
      process.exit(1)
    })
}

export default fp(plugin)
