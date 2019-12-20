import request from 'supertest'
import api from '../src/index'
import { mockUser, mockLogin, cleanupAll } from './utils'
import Genre from '../src/entity/series/Genre'

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

describe('POST /series/genres', () => {
  it('should create new genre and respond with json', async () => {
    const { token } = await mockLogin(app)

    await request(app.server)
      .post('/v1/series/genres')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        name: 'action'
      })
      .expect(res => {
        const data: Genre = res.body.data
        expect(data).toBeDefined()
        expect(data.name).toBeDefined()
      })
      .expect(201)
  })
})

describe('GET /series/genres', () => {
  it('should respond with json with all genres', async () => {
    await request(app.server)
      .get('/v1/series/genres')
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        const data: Genre[] = res.body.data
        expect(Array.isArray(data)).toBeTruthy()
        expect(data[0].name).toBeDefined()
      })
      .expect(200)
  })
})

afterAll(() => {
  app.close(() => {})
})
