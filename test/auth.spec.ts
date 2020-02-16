import request from 'supertest'
import api from '../src/index'
import { randomUsername, mockUser, randomEmail, randomPassword, cleanupAll } from './utils'

const app = api()

beforeAll(async () => {
  await app.ready()

  await cleanupAll(app)
})

describe('POST auth/login', () => {
  it('should respond with token after successful login', async () => {
    await mockUser(app)
    await request(app.server)
      .post('/v1/auth/login')
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        username: randomUsername,
        password: randomPassword
      })
      .expect(res => {
        const data = res.body.data
        expect(data.token).toBeDefined()
      })
      .expect(200)
  })
})

describe('POST auth/register', () => {
  it('should respond with status code 201 after successful register', async () => {
    await request(app.server)
      .post('/v1/auth/register')
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        username: randomUsername,
        password: randomPassword,
        email: randomEmail
      })
      .expect(201)
  })
})

afterAll(() => {
  app.close()
})
