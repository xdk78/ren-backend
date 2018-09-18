import dotenv from 'dotenv-safe'
let envConfig = {}
if (process.env.NODE_ENV === 'production') {
  envConfig = { path: './.env.production' }
} else if (process.env.NODE_ENV === 'test') {
  envConfig = { path: './.env.test' }
} else {
  envConfig = { path: './.env' }
}
dotenv.config(Object.assign({}, { allowEmptyValues: true, example: './.env.example' }, envConfig))
import fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import db from './db'
import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import circuitBreaker from 'fastify-circuit-breaker'
import cors from 'cors'
import consola from 'consola'
import index from './routes/v1/'
import series from './routes/v1/series'
import users from './routes/v1/users'
import auth from './routes/v1/auth'
import logger from './routes/v1/middlewares/logger'

const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

const PORT = process.env.API_PORT || 5000
const HOST = process.env.API_HOST || '0.0.0.0'

app.register(db).ready()
app.register(circuitBreaker, {
  threshold: 5,
  timeout: 15000,
  resetTimeout: 15000,
})
app.register(helmet)
app.use(cors())
app.register(compress)
app.use(logger())
// API Routing
app.register(index, { prefix: '/v1' })
app.register(series, { prefix: '/v1' })
app.register(users, { prefix: '/v1' })
app.register(auth, { prefix: '/v1' })

app.listen(PORT as number, HOST, (err) => {
  if (err) throw err
  // @ts-ignore
  consola.start(`Senren api is listening on ${app.server.address().address}:${app.server.address().port}`)
})

export default () => app
