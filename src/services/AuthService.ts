import { FastifyInstance, FastifyRequest } from 'fastify'
import BaseService from './BaseService'
import { compare, hash } from 'bcrypt'
import User from '../entity/User'
import { IncomingMessage } from 'http'
import WatchList from '../entity/WatchList'
import { getRandomString, generateToken } from '../utils/authUtils'

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
        const token = generateToken(userFromDb.secret, userFromDb.id)
        return {
          data: {  token , message: 'Login success' },
          error: '',
        }
      }
      throw new Error('Wrong password')

    } catch (error) {
      return error
    }
  }

  async logout(id:any): Promise<Object> {
    try {
      // @ts-ignore
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      await userModel.destroySessions(id, getRandomString(32))
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
      const userSecret = getRandomString(32)
      const user = new userModel(
        {
          username: payload.username,
          email: payload.email,
          password: await hash(payload.password, this.saltRounds),
          createdAt: new Date().toISOString(),
          watchList: await new watchListModel({}).save(),
          secret: userSecret,
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
