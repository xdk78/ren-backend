import { AppInstance } from '../'
import { Connection } from 'mongoose'

export default interface BaseService {
  connection: Connection
  fastify: AppInstance
}
