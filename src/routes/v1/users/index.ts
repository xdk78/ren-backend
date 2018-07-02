import login from './login'
import register from './register'
import search from './search'

export default async (fastify, opts) => {
  login(fastify, opts)
  register(fastify, opts)
  search(fastify, opts)
  return
}
