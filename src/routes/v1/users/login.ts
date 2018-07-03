import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import * as bcrypt from 'bcrypt'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db

  fastify.post('/users/login', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const userFromDb = await userModel.findOne({
        username: request.body.username,
      })

      if (await bcrypt.compare(request.body.password, userFromDb.password)) {
        reply.send({
          data: { message: 'Login success', _id: userFromDb._id },
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
  return
}
