import search from './search'
import watchList from './watchList'
import { AppInstance } from '../../../'

export default async (fastify: AppInstance) => {
  fastify.register(search)
  fastify.register(watchList)
}
