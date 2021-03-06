import BaseService from './BaseService'
import { compare, hash } from 'bcrypt'
import User from '../entity/User'
import WatchList from '../entity/WatchList'
import { getRandomString, generateToken } from '../utils/authUtils'
import { getModelForClass } from '@typegoose/typegoose'
import { AppInstance } from '../'
import { Connection } from 'mongoose'
import { USER_404_MESSAGE } from '../utils/error_messages'
import { ObjectId } from 'mongodb'

export default class AuthService implements BaseService {
  connection: Connection
  fastify: AppInstance
  saltRounds = 10

  constructor(fastify: AppInstance) {
    this.connection = fastify.mongo.db
  }

  async login(username: string, password: string) {
    try {
      const userModel = getModelForClass(User, { existingConnection: this.connection })
      const userFromDb = await userModel.findOne({
        username: username,
      })

      if (userFromDb) {
        if (await compare(password, userFromDb.password)) {
          const token = generateToken(userFromDb.secret, userFromDb._id)

          return {
            data: { token },
          }
        }
        throw new Error('Wrong password')
      } else {
        throw new Error(USER_404_MESSAGE)
      }
    } catch (error) {
      throw error
    }
  }

  async logout(id: ObjectId) {
    try {
      const userModel = getModelForClass(User, { existingConnection: this.connection })
      await userModel.destroySessions(id, getRandomString(32))
      return {
        data: {},
      }
    } catch (error) {
      throw error
    }
  }

  async register(payload: User) {
    try {
      const userModel = getModelForClass(User, { existingConnection: this.connection })
      if (await userModel.findOne({ username: payload.username, email: payload.email })) {
        throw new Error('User does exit')
      } else {
        const watchListModel = getModelForClass(WatchList, { existingConnection: this.connection })
        const userSecret = getRandomString(32)
        const user = await userModel.create({
          username: payload.username,
          email: payload.email,
          password: await hash(payload.password, this.saltRounds),
          createdAt: new Date().toISOString(),
          watchList: await watchListModel.create({}),
          secret: userSecret,
        })
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
