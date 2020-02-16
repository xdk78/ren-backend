import request from 'supertest'
import api from '../src/index'
import {
  mockUser,
  mockLogin,
  mockGenre,
  mockCategory,
  randomSeriesTitle,
  randomSeriesDescription,
  mockSeries,
  cleanupAll
} from './utils'

const app = api()

beforeAll(async () => {
  await app.ready()

  await cleanupAll(app)

  await mockUser(app)
})

describe('POST /series', () => {
  it('should create new series and respond with json', async () => {
    const { token } = await mockLogin(app)
    const genre = await mockGenre(app)
    const category = await mockCategory(app)

    await request(app.server)
      .post('/v1/series')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        title: randomSeriesTitle,
        description: randomSeriesDescription,
        category: category._id,
        genres: [genre._id]
      })
      .expect(201)
  })
})

describe('GET /series', () => {
  it('should get series and respond with json', async () => {
    await mockSeries(app)

    await request(app.server)
      .get('/v1/series')
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect(res.body.data[0].title).toBeDefined()
        expect(res.body.data[0].description).toBeDefined()
        expect(res.body.data[0].seasons).toBeDefined()
        expect(res.body.data[0].category).toBeDefined()
        expect(res.body.data[0].genres).toBeDefined()
        expect(res.body.data[0].rating).toBeDefined()
      })
      .expect(200)
  })
})

afterAll(() => {
  app.close()
})
