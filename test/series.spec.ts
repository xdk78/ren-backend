jest.setTimeout(100000)

import request from 'supertest'
import api from '../src/index'
import fs from 'fs'
import path from 'path'

const seriesPostMock = fs.readFileSync(path.join(__dirname + '/__mocks__/series.post.json'))
const seriesResponseMock = fs.readFileSync(path.join(__dirname + '/__mocks__/series.post.response.json'))

const app = api()

beforeAll(async () => {
  await app.ready()
})

describe('POST /series', () => {
  it('responds with json', (done) => {
    request(app.server)
      // @ts-ignore
      .post('/v1/series')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      // @ts-ignore
      .send(JSON.parse(seriesPostMock))
      .expect((res) => {
        // @ts-ignore
        res.body = JSON.parse(seriesResponseMock)
      })
      .expect(200, done)
  })
})

afterAll(() => {
  app.close(() => { })
})
