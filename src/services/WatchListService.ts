import BaseService from './BaseService'
import { FastifyInstance } from 'fastify'
import WatchList from '../entity/WatchList'
import User from '../entity/User'
import SeriesService from './SeriesService'
export default class WatchListService implements BaseService {
  connection: any
  fastify: FastifyInstance
  seriesService : SeriesService

  constructor(fastify: FastifyInstance) {
    // @ts-ignore
    this.connection = fastify.mongo.db
    this.seriesService = new SeriesService(fastify)
  }

  async getWatchList(id: string): Promise<Object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: id })
      if (!user) {
        throw new Error('Could not find user')
      } else {
        const watchListRefs = await watchListModel.findOne({ _id: user.watchList })
        const keys = ['onHold', 'watching', 'completed', 'planToWatch', 'dropped']
        const watchList = {}
        // @ts-ignore
        for (const key in watchListRefs._doc) {
          if (keys.includes(key)) {
            // @ts-ignore
            watchList[key] = await this.seriesService.fetchAllSeries(watchListRefs._doc[key])
          }
        }
        return watchList
      }
    } catch (error) {
      return error
    }
  }
}
