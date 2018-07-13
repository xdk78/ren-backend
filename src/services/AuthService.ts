import { FastifyInstance, FastifyRequest } from 'fastify'
import BaseService from './BaseService'
import { compare, hash } from 'bcrypt'
import User from '../entity/User'
import { IncomingMessage } from 'http'
import WatchList from '../entity/WatchList'

export default class AuthService implements BaseService {
  connection: any
  fastify: FastifyInstance
  saltRounds = 10

  constructor(fastify: FastifyInstance) {
    // @ts-ignore
    this.connection = fastify.mongo.db
  }

  async login(request: FastifyRequest<IncomingMessage>, username: string, password: string): Promise<Object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const userFromDb = await userModel.findOne({
        username: username,
      })

      if (await compare(password, userFromDb.password)) {
        // @ts-ignore
        request.session.userId = userFromDb.id
        return {
          data: { message: 'Login success', _id: userFromDb._id },
          error: '',
        }
      }
      throw new Error('Wrong password')

    } catch (error) {
      return error
    }
  }

  async logout(request: FastifyRequest<IncomingMessage>): Promise<Object> {
    try {
      // @ts-ignore
      const session = request.session
      session.userId = null

      // @ts-ignore
      request.sessionStore.destroy(session.sessionId, null)
      return {
        data: { message: 'Logged out' },
        error: '',
      }

    } catch (error) {
      return error
    }
  }

  async register(payload: User): Promise<Object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: this.connection })
      const user = new userModel(
        {
          username: payload.username,
          email: payload.email,
          password: await hash(payload.password, this.saltRounds),
          createdAt: new Date().toISOString(),
          watchList: await new watchListModel({}).save(),
        },
      )
      if (user) {
        await user.save()

        return {
          data: { message: 'Register success' },
          error: '',
        }
      }
      throw new Error('Wrong credentials')

    } catch (error) {
      return error
    }
  }

}
