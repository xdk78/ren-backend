import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import WatchList, { StatusNumber } from '../../../entity/WatchList'
import SeriesState from '../../../entity/series/SeriesState'
import Series from '../../../entity/series/Series'
import WatchListSerivce from '../../../services/WatchListService'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db
  const watchListService = new WatchListSerivce(fastify)
  fastify.get(
    '/users/:id/watchlist',
    async (
      request: FastifyRequest<IncomingMessage>,
      reply: FastifyReply<ServerResponse>,
    ) => {
      try {
        reply.header('Content-Type', 'application/json').code(200)

        const watchList = await watchListService.getWatchList(request.params.id)

        reply.send({
          data: watchList,
          error: '',
        })
      } catch (error) {
        return {
          data: {},
          error: error.message,
        }
      }
    },
  )

  fastify.post(
    '/users/:id/watchlist',
    async (
      request: FastifyRequest<IncomingMessage>,
      reply: FastifyReply<ServerResponse>,
    ) => {
      try {
        reply.header('Content-Type', 'application/json').code(200)
        // @ts-ignore
        const userId = request.session.userId

        if (userId) {
          const userModel = new User().getModelForClass(User, {
            existingConnection: db,
          })
          const watchListModel = new WatchList().getModelForClass(WatchList, {
            existingConnection: db,
          })
          const seriesStateModel = new SeriesState().getModelForClass(
            SeriesState,
            { existingConnection: db },
          )
          const seriesModel = new Series().getModelForClass(Series, {
            existingConnection: db,
          })
          const user = await userModel.findOne({ _id: request.params.id })
          if (user) {
            const status = request.body.status
            const { seriesId, seasonNumber, episodeNumber } = request.body
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

            reply.send({
              data: user.watchList,
              error: '',
            })
          } else {
            throw new Error('Couldn\'t find user')
          }
        } else {
          throw new Error('User is not logged in')
        }
      } catch (error) {
        return {
          data: {},
          error: error.message,
        }
      }
    },
  )
  fastify.delete(
    '/users/:id/watchlist',
    async (
      request: FastifyRequest<IncomingMessage>,
      reply: FastifyReply<ServerResponse>,
    ) => {
      try {
        reply.header('Content-Type', 'application/json').code(200)
        const userModel = new User().getModelForClass(User, {
          existingConnection: db,
        })
        const watchListModel = new WatchList().getModelForClass(WatchList, {
          existingConnection: db,
        })

        const user = await userModel.findOne({ _id: request.params.id })
        if (user) {
          const status = request.body.status
          const seriesState = request.body.seriesState

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

          reply.send({
            data: user.watchList,
            error: '',
          })
        } else {
          throw new Error('Couldn\'t find user')
        }
      } catch (error) {
        return {
          data: {},
          error: error.message,
        }
      }
    },
  )
  return
}
