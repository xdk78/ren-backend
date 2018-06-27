import login from './login'
import register from './register'
import search from './search'

export default async (fastify, opts, next) => {
  login(fastify, opts, next)
  register(fastify, opts, next)
  search(fastify, opts, next)
}
