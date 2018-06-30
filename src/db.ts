import 'reflect-metadata'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'
const objectId = mongoose.Types.ObjectId

let connURI = ''
if (process.env.NODE_ENV === 'production') {
  connURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
} else {
  connURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
}

function plugin(fastify: FastifyInstance, options, next) {
  return mongoose.createConnection(connURI).then(connection => {
    fastify.decorate('mongo', {
      db: connection,
      ObjectId: objectId,
    }).addHook('onClose', (fastify, done) => {
      // @ts-ignore
      fastify.mongo.db.close(done)
    })
  }).catch(error => next(error))
}

export default fp(plugin)
