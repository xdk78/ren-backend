import { FastifyInstance } from 'fastify'
import User from '../entity/User'
import WatchList, { StatusNumber } from '../entity/WatchList'
import BaseService from './BaseService'
import SeriesService from './SeriesService'
import Series from '../entity/series/Series'
import SeriesState from '../entity/series/SeriesState'
import { Ref } from 'typegoose'

export default class WatchListService implements BaseService {
  connection: any
  fastify: FastifyInstance
  seriesService: SeriesService

  constructor(fastify: FastifyInstance) {
    // @ts-ignore
    this.connection = fastify.mongo.db
    this.seriesService = new SeriesService(fastify)

  }

  async getWatchList(userId: Ref<User>): Promise<object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: userId })
      if (!user) {
        throw new Error('Could not find user')
      } else {
        const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: this.connection })
        const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
        const watchListRefs = await watchListModel.findOne({ _id: user.watchList })
          .populate([
            { path: 'watching', model: seriesModel },
            { path: 'completed', model: seriesModel },
            { path: 'onHold', model: seriesModel },
            { path: 'dropped', model: seriesModel },
            { path: 'planToWatch', model: seriesModel }])
        return watchListRefs
      }
    } catch (error) {
      return error
    }
  }

  async addToWatchList(userId: Ref<User>, status: StatusNumber, payload: SeriesState): Promise<object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: userId })
      if (user) {
        const { seriesId, seasonNumber, episodeNumber } = payload
        if (await this.seriesService.doesExist(seriesId)) {
          const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: this.connection })
          if (await watchListModel.findById(seriesId)) {
            throw new Error('Series exist on watchlist')
          } else {
            const seriesStateModel = new SeriesState().getModelForClass(SeriesState, { existingConnection: this.connection })
            const seriesState = new seriesStateModel({
              seriesId: seriesId,
              seasonNumber: seasonNumber,
              episodeNumber: episodeNumber,
            })
            await seriesState.save()
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
        } else {
          throw new Error('Series does not exist')
        }
      } else {
        throw new Error('Could not find user')
      }
    } catch (error) {
      return error
    }
  }

  async removeFromWatchList(id: string, status: number, seriesState): Promise<object> {
    try {
      const userModel = new User().getModelForClass(User, { existingConnection: this.connection })
      const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: this.connection })
      const user = await userModel.findOne({ _id: id })

      if (user) {
        switch (status) {
          case StatusNumber.watching:
            await watchListModel.removeFromWatching(
              user.watchList,
              seriesState,
            )
            break
          case StatusNumber.completed:
            await watchListModel.removeFromCompleted(
              user.watchList,
              seriesState,
            )
            break
          case StatusNumber.onHold:
            await watchListModel.removeFromOnHold(
              user.watchList,
              seriesState,
            )
            break
          case StatusNumber.dropped:
            await watchListModel.removeFromDropped(
              user.watchList,
              seriesState,
            )
            break
          case StatusNumber.planToWatch:
            await watchListModel.removeFromPlanToWatch(
              user.watchList,
              seriesState,
            )
            break
          default:
            throw new Error('Wrong status')
        }
      } else {
        throw new Error('Could not find user')
      }
    } catch (error) {
      return error
    }
  }
}
