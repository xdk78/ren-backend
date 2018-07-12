import { dbConnURI } from './utils'
import 'reflect-metadata'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'
const objectId = mongoose.Types.ObjectId

function plugin(fastify: FastifyInstance, options, next) {
  return mongoose.createConnection(dbConnURI, { useNewUrlParser: true }).then(connection => {
    fastify.decorate('mongo', {
      db: connection,
      ObjectId: objectId,
    }).addHook('onClose', (fastify, done) => {
      // @ts-ignore
      fastify.mongo.db.close(done)
    })
    console.log('Succesfully connected to database')
  }).catch(error => {
    next(error)
    process.exit(1)
  })
}

export default fp(plugin)
