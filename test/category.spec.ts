import request from 'supertest'
import api from '../src/index'
import categoryPostMock from './__mocks__/post/category-req.json'
import { mockUser, cleanupUsers, mockLogin } from './utils'
import Category from '../src/entity/series/Category'

const app = api()

beforeAll(async () => {
  await app.ready()
  const connection = app.mongo.db

  const categoryModel = new Category().getModelForClass(Category, { existingConnection: connection })
  await categoryModel.deleteMany({})
  await cleanupUsers(app)

  await mockUser(app)
})

describe('POST /series/category', () => {
  it('should create new category and respond with json', async () => {
    const { token } = await mockLogin(app)

    await request(app.server)
      .post('/v1/series/category')
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

afterAll(() => {
  app.close(() => {})
})
