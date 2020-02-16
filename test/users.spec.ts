import request from 'supertest'
import api from '../src/index'
import { mockUser, mockLogin, cleanupAll } from './utils'
import User from '../src/entity/User'
import { USER_404_MESSAGE } from '../src/utils/error_messages'

const app = api()

beforeAll(async () => {
  await app.ready()

  await cleanupAll(app)
})

describe('GET /users/:id', () => {
  it('should respond with the same data as mocked user after search by id', async () => {
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
  it('should respond with error if user does not exist', async () => {
    const { token } = await mockLogin(app)
    const doesNotExist = `dosentexistinguserid${Math.random()}`

    await request(app.server)
      .get(`/v1/users/${doesNotExist}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        const data = res.body
        expect(data.error).toBe(USER_404_MESSAGE)
      })
      .expect(404)
  })
})

afterAll(() => {
  app.close(() => {})
})
