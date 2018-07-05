import User from '../../../entity/User'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import WatchList from '../../../entity/WatchList'

export default async (fastify: FastifyInstance, opts) => {
  // @ts-ignore
  const db = fastify.mongo.db

  fastify.post('/users/:id/watchlist', async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
      reply.header('Content-Type', 'application/json').code(200)
      const userModel = new User().getModelForClass(User, { existingConnection: db })
      const wachListModel = new WatchList().getModelForClass(WatchList, { existingConnection: db })

      const user = await userModel.findOne({ _id: request.params.id })
      if (user) {
        const watchList = new wachListModel(
          {
            watching: request.body.watching,
            completed: request.body.completed,
            onHold: request.body.onHold,
            dropped: request.body.dropped,
            planToWatch: request.body.planToWatch,
          },
        )
        await userModel.addToWatchList(user._id, watchList)
        // await wachListModel.addToWatching(user._id, { $pull: { watching: watchList.watching })

        reply.send({
          data: watchList,
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
  })
  return
}
