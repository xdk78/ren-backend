import BaseService from './BaseService'
import User from '../entity/User'
import { AppInstance } from '../'
import { Connection } from 'mongoose'
import { USER_404_MESSAGE } from '../utils/error_messages'
import { ObjectId } from 'mongodb'
import { getModelForClass } from '@typegoose/typegoose'

export default class UsersService implements BaseService {
  connection: Connection
  fastify: AppInstance

  constructor(fastify: AppInstance) {
    this.connection = fastify.mongo.db
  }

  async getUser(userId: ObjectId) {
    try {
      const userModel = getModelForClass(User, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: userId })
      if (!user) {
        throw new Error(USER_404_MESSAGE)
      } else {
        return {
          data: {
            _id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            avatar: user.avatar,
            gender: user.gender,
            watchListId: user.watchList,
          },
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
