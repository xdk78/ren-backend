import User from '../../../entity/User'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerRequest, ServerResponse } from 'http'
import * as bcrypt from 'bcrypt'

export default async (fastify, opts, next) => {
  const db = fastify.mongo.db

  fastify.post('/users/login', async (request: FastifyRequest<ServerRequest>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const userFromDb = await userModel.findOne({
        username: request.body.username,
      })

      if (await bcrypt.compare(request.body.password, userFromDb.password)) {
        reply.send({
          data: { message: 'Login success', id: userFromDb._id }, // TODO: return token here
          error: '',
        })
      } else {
        throw new Error('Wrong password')
      }
    } catch (error) {
      return {
        data: {},
        error: error.message,
      }
    }
  })
  next()
}
