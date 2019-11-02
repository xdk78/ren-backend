import request from 'supertest'
import api from '../src/index'
import { mockUser, cleanupUsers, cleanupCategories, mockLogin } from './utils'
import User from '../src/entity/User'

const app = api()

beforeAll(async () => {
  await app.ready()

  await cleanupCategories(app)
  await cleanupUsers(app)
})

describe('GET /users/:id', () => {
  it('should respond with json for a given user id', async () => {
    const { _id, username, createdAt } = await mockUser(app)
    const { token } = await mockLogin(app)

    await request(app.server)
      .get(`/v1/users/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        const data: User = res.body.data
        // @ts-ignore
        expect(JSON.stringify(data._id)).toEqual(JSON.stringify(_id))
        expect(data.username).toEqual(username)
        expect(data.createdAt).toEqual(createdAt)
      })
      .expect(200)
  })
})

afterAll(() => {
  app.close(() => {})
})
