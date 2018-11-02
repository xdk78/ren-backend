import { FastifyInstance } from 'fastify'
import BaseService from './BaseService'
import { compare, hash } from 'bcrypt'
import User from '../entity/User'
import WatchList from '../entity/WatchList'
import { getRandomString, generateToken } from '../utils/authUtils'
import { Ref } from 'typegoose'

export default class AuthService implements BaseService {
  connection: any
  fastify: FastifyInstance
  saltRounds = 10

  constructor(fastify: FastifyInstance) {
    // @ts-ignore
    this.connection = fastify.mongo.db
  }

  async login(username: string, password: string): Promise<object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const userFromDb = await userModel.findOne({
        username: username,
      })
      if (userFromDb) {
        if (await compare(password, userFromDb.password)) {
          const token = generateToken(userFromDb.secret, userFromDb.id)
          return {
            data: { token },
          }
        }
        throw new Error('Wrong password')
      } else {
        throw new Error('Could not find user')
      }
    } catch (error) {
      throw error
    }
  }

  async logout(id: Ref<User>): Promise<object> {
    try {
      // @ts-ignore
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      await userModel.destroySessions(id, getRandomString(32))
      return {
        data: {},
      }

    } catch (error) {
      throw error
    }
  }

  async register(payload: User): Promise<object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      if (await userModel.findOne({ username: payload.username, email: payload.email })) {
        throw new Error('User does exit')
      } else {
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
            data: {},
          }
        }
        throw new Error('Wrong credentials')
      }
    } catch (error) {
      throw error
    }
  }

}
