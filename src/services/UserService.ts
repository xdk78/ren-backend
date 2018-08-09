import { FastifyInstance } from 'fastify'
import BaseService from './BaseService'
import User from '../entity/User'
import { Ref } from 'typegoose'

export default class UserService implements BaseService {
  connection: any
  fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    // @ts-ignore
    this.connection = fastify.mongo.db
  }

  async fetchUser(userId: Ref<User>): Promise<object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: userId })
      const output = {
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        avatar: user.avatar,
        gender: user.gender,
        watchListId: user.watchList,
        seriesStates: user.seriesStates,
      }

      return output
    } catch (error) {
      return error
    }
  }
}
