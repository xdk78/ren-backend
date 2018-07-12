import { FastifyInstance } from 'fastify'
import User from '../entity/User'
import WatchList, { StatusNumber } from '../entity/WatchList'
import BaseService from './BaseService'
import SeriesService from './SeriesService'
import Series from '../entity/series/Series'
import SeriesState from '../entity/series/SeriesState'

export default class WatchListService implements BaseService {
  connection: any
  fastify: FastifyInstance
  seriesService: SeriesService

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

  async addToWatchList(status: number, id: string, payload): Promise<Object> {
    try {
      const db = this.connection
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: db })
      const seriesStateModel = new SeriesState().getModelForClass(SeriesState, { existingConnection: db })
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: db })
      const user = await userModel.findOne({ _id: id })
      if (user) {
        const { seriesId, seasonNumber, episodeNumber } = payload

        const seriesState = new seriesStateModel({
          seriesId: seriesId,
          seasonNumber: seasonNumber,
          episodeNumber: episodeNumber,
        })

        switch (status) {
          case StatusNumber.watching:
            await watchListModel.addToWatching(user.watchList, seriesState)
            break
          case StatusNumber.onHold:
            await watchListModel.addToOnHold(user.watchList, seriesState)
            break
          case StatusNumber.dropped:
            await watchListModel.addToDropped(user.watchList, seriesState)
            break
          case StatusNumber.completed:
            await watchListModel.addToCompleted(user.watchList, seriesId)
            break
          case StatusNumber.planToWatch:
            await watchListModel.addToPlanToWatch(user.watchList, seriesId)
            break
          default:
            throw new Error('Wrong status')
        }
      }
    } catch (error) {
      return error
    }
  }
}
