import { FastifyInstance } from 'fastify'
import BaseService from './BaseService'
import User from '../entity/User'
import { Ref } from 'typegoose'

export default class UsersService implements BaseService {
  connection: any
  fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    // @ts-ignore
    this.connection = fastify.mongo.db
  }

  async getUser(userId: Ref<User>): Promise<object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: userId })
      if (!user) {
        throw new Error('Could not find user')
      } else {
        const data = {
          _id: user._id,
          username: user.username,
          createdAt: user.createdAt,
          avatar: user.avatar,
          gender: user.gender,
          watchListId: user.watchList,
        }
        return {
          data: data,
          success: true,
          error: '',
        }
      }

    } catch (error) {
      throw error
    }
  }
}
