import request from 'supertest'
import api from '../src/index'
import seriesPostMock from './__mocks__/seriesPost.json'
import seriesPostResponseMock from './__mocks__/seriesPostResponse.json'

const bearerToken = process.env.API_BEARER_SECRET_TOKEN
const app = api()

beforeAll(async () => {
  await app.ready()
})
// TODO: Fix this test
// describe('POST /series', () => {
//   it('responds with json', (done) => {
//     request(app.server)
//       .post('/v1/series')
//       .set('Authorization', `Bearer ${bearerToken}`)
//       .set('Accept', 'application/json')
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .send(seriesPostMock)
//       .expect((res) => {
//         res.body = seriesPostResponseMock
//       })
//       .expect(200, done)
//   })
// })

describe('GET /series', () => {
  it('responds with all series json', async () => {
    await request(app.server)
      .get('/v1/series')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application/json')
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
