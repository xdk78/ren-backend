import request from 'supertest'
import api from '../src/index'
import categoryPostMock from './__mocks__/post/categories-req.json'
import { mockUser, mockLogin, cleanupAll } from './utils'
import Category from '../src/entity/series/Category'

const app = api()

beforeAll(async () => {
  await app.ready()

  await cleanupAll(app)

  await mockUser(app)
})

beforeEach(async () => {
  jest.useFakeTimers()
  jest.runAllTimers()
})

describe('POST /series/categories', () => {
  it('should create new category and respond with json', async () => {
    const { token } = await mockLogin(app)

    await request(app.server)
      .post('/v1/series/categories')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send(categoryPostMock)
      .expect(res => {
        const data: Category = res.body.data
        expect(data).toBeDefined()
        expect(data.name).toBeDefined()
      })
      .expect(201)
  })
})

describe('GET /series/categories', () => {
  it('should respond with json with all categories', async () => {
    await request(app.server)
      .get('/v1/series/categories')
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        const data: Category[] = res.body.data
        expect(Array.isArray(data)).toBeTruthy()
        expect(data[0].name).toBeDefined()
      })
      .expect(200)
  })
})

afterAll(() => {
  app.close(() => {})
})
