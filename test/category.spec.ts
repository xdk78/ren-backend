import request from 'supertest'
import api from '../src/index'
import categoryPostMock from './__mocks__/post/category-req.json'
import categoryPostResponseMock from './__mocks__/post/res.json'
import { bearerToken } from './utils'

const app = api()

beforeAll(async () => {
  await app.ready()
})

describe('POST /series/category', () => {
  it('should create new category and respond with json', async () => {
    await request(app.server)
      .post('/v1/series/category')
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send(categoryPostMock)
      .expect(res => {
        const data: typeof categoryPostResponseMock = res.body.data
        expect(data).toBeDefined()
      })
      .expect(201)
  })
})

afterAll(() => {
  app.close(() => {})
})
