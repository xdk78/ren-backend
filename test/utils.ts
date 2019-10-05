import { AppInstance } from '../src'
import User from '../src/entity/User'
import WatchList from '../src/entity/WatchList'
import { getRandomString } from '../src/utils/authUtils'
import { hash } from 'bcrypt'
import request from 'supertest'

const saltRounds = 10

export async function mockUser(app: AppInstance): Promise<User> {
  const connection = app.mongo.db
  const userModel = new User().getModelForClass(User, { existingConnection: connection })
  const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: connection })
  const userSecret = getRandomString(32)

  const user = new userModel({
    username: 'foo',
    email: 'foo@bar.com',
    password: await hash('foobar', saltRounds),
    createdAt: new Date().toISOString(),
    watchList: await new watchListModel({}).save(),
    secret: userSecret
  })
  await user.save()
  return user
}

export async function cleanupUsers(app: AppInstance): Promise<void> {
  const connection = app.mongo.db
  const userModel = new User().getModelForClass(User, { existingConnection: connection })
  await userModel.deleteMany({})
}

export async function mockLogin(
  app: AppInstance
): Promise<{
  token: string
}> {
  const res = await request(app.server)
    .post('/v1/auth/login')
    .set('Accept', 'application/json; charset=utf-8')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .send({
      username: 'foo',
      password: 'foobar'
    })
    .expect(res => {
      const data = res.body.data
      expect(data.token).toBeDefined()
    })
    .expect(200)

  const token = res.body.data.token
  return { token }
}
