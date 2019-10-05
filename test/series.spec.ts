// TODO: Fix all tests
import request from 'supertest'
import api from '../src/index'
import seriesPostMock from './__mocks__/post/series-req.json'
import seriesPostResponseMock from './__mocks__/post/res.json'

const app = api()

beforeAll(async () => {
  await app.ready()
})

// describe('POST /series', () => {
//   it('should create new series and respond with json', async () => {
//     await request(app.server)
//       .post('/v1/series')
//       .set('Authorization', `Bearer ${bearerToken}`)
//       .set('Accept', 'application/json; charset=utf-8')
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .send(seriesPostMock)
//       .expect(res => {
//         res.body = seriesPostResponseMock
//       })
//       .expect(201)
//   })
// })

describe('GET /series', () => {
  it('should get series and respond with json', async () => {
    await request(app.server)
      .get('/v1/series')
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect(res.body.data.title).toBeDefined()
        expect(res.body.data.description).toBeDefined()
        expect(res.body.data.seasons).toBeDefined()
        expect(res.body.data.category).toBeDefined()
        expect(res.body.data.genres).toBeDefined()
        expect(res.body.data.rating).toBeDefined()
      })
      .expect(200)
  })
})

afterAll(() => {
  app.close(() => {})
})
