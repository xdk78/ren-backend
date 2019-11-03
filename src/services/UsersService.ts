import BaseService from './BaseService'
import User from '../entity/User'
import { Ref } from '@hasezoey/typegoose'
import { AppInstance } from '../'
import { Connection } from 'mongoose'
import { USER_404_MESSAGE } from '../utils/error_messages'

export default class UsersService implements BaseService {
  connection: Connection
  fastify: AppInstance

  constructor(fastify: AppInstance) {
    this.connection = fastify.mongo.db
  }

  async getUser(userId: Ref<User>) {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: userId })
      if (!user) {
        throw new Error(USER_404_MESSAGE)
      } else {
        const data = {
          _id: user._id,
          username: user.username,
          createdAt: user.createdAt,
          avatar: user.avatar,
          gender: user.gender,
          watchListId: user.watchList
        }
        return {
          data: data
        }
      }
    } catch (error) {
      if (error.name === 'CastError') {
        throw new Error(USER_404_MESSAGE)
      } else {
        throw error
      }
    }
  }
}
