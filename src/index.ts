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
import { dbConnURI } from './utils'
import fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import db from './db'
import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import bearerAuth from 'fastify-bearer-auth'
import session from 'fastify-session'
import cookie from 'fastify-cookie'
import mongoConnect from 'connect-mongodb-session'
const mongoStore = mongoConnect(session)
import index from './routes/v1/'
import series from './routes/v1/series'
import users from './routes/v1/users'

const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

const PORT = process.env.API_PORT || 5000
const HOST = process.env.API_HOST || '0.0.0.0'
const secureCookie = () => {
  let secure = false
  if (process.env.API_SESSION_COOKIE_SECURE === 'true') {
    secure = true
  } else {
    secure = false
  }
  return secure
}

const keys = new Set([process.env.API_BEARER_SECRET_TOKEN])

app.register(db).ready()
app.register(helmet)
app.register(compress)
app.register(bearerAuth, { keys })
app.register(cookie)
app.register(session, {
  secret: process.env.API_SESSION_SECRET_TOKEN,
  store: new mongoStore({
    uri: dbConnURI,
    collection: 'sessions',
  }),
  cookie: {
    secure: secureCookie(),
    maxAge: 1000 * 60 * 60 * 24 * 7,  // 1 week
  },
})

// API Routing
app.register(index, { prefix: '/v1' })
app.register(series, { prefix: '/v1' })
app.register(users, { prefix: '/v1' })

app.get('/', (request, reply) => {
  reply.redirect(302, '/v1')
})

app.listen(PORT as number, HOST, (err) => {
  if (err) throw err
  // @ts-ignore
  console.log(`Senren api is listening on ${app.server.address().address}:${app.server.address().port}`)
})

export default () => app
