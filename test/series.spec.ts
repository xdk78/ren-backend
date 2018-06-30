jest.setTimeout(100000)

import request from 'supertest'
import api from '../src/index'
import fs from 'fs'
import path from 'path'

const seriesPostMock = fs.readFileSync(path.join(__dirname + '/__mocks__/seriesPost.json'))
const seriesPostResponseMock = fs.readFileSync(path.join(__dirname + '/__mocks__/seriesPostResponse.json'))
const bearerToken = process.env.API_BEARER_SECRET_TOKEN

const app = api()

beforeAll(async () => {
  await app.ready()
})

describe('POST /series', () => {
  it('responds with json', (done) => {
    request(app.server)
      .post('/v1/series')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      // @ts-ignore
      .send(JSON.parse(seriesPostMock))
      .expect((res) => {
        // @ts-ignore
        res.body = JSON.parse(seriesPostResponseMock)
      })
      .expect(200, done)
  })
})

describe('GET /series', () => {
  it('responds with all series json', (done) => {
    request(app.server)
      .get('/v1/series')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect(res.body.data.title).not.toBeNull()
        expect(res.body.data.description).not.toBeNull()
        expect(res.body.data.seasons).not.toBeNull()
        expect(res.body.data.category).not.toBeNull()
        expect(res.body.data.genres).not.toBeNull()
        expect(res.body.data.rating).not.toBeNull()
      })
      .expect(200, done)
  })
})

afterAll(() => {
  app.close(() => { })
})
