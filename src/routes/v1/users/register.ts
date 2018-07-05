import User from '../../../entity/User'
import WatchList from '../../../entity/WatchList'

import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import * as bcrypt from 'bcrypt'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db
  const saltRounds = 10

  fastify.post('/users/register', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: db })
      const user = new userModel(
        {
          username: request.body.username,
          email: request.body.email,
          password: await bcrypt.hash(request.body.password, saltRounds),
          createdAt: new Date().toISOString(),
          watchList: await new watchListModel({}).save(),
        },
      )
      if (user) {
        await user.save()

        reply.send({
          data: { message: 'Register success' },
          error: '',
        })
      } else {
        throw new Error('Wrong credentials')
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
