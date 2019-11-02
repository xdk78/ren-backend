import { dbConnURI } from './utils/conn'
import fp, { nextCallback, PluginOptions } from 'fastify-plugin'
import mongoose from 'mongoose'
import consola from 'consola'
import { AppInstance } from '../src'

function plugin(fastify: AppInstance, options: PluginOptions, next: nextCallback) {
  return mongoose
    .createConnection(dbConnURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(connection => {
      fastify
        .decorate('mongo', {
          db: connection,
          ObjectId: mongoose.Types.ObjectId
        })
        .addHook('onClose', (fastify: AppInstance, done) => {
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
