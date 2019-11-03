import { AppInstance } from '../src'
import User from '../src/entity/User'
import WatchList from '../src/entity/WatchList'
import { getRandomString } from '../src/utils/authUtils'
import { hash } from 'bcrypt'
import Category from '../src/entity/series/Category'
import Genre from '../src/entity/series/Genre'
import mongoose from 'mongoose'
import AuthService from '../src/services/AuthService'

const saltRounds = 10

export const randomUsername = `foo${Math.random() * 100}`
export const randomPassword = `foobar${Math.random() * 100}`
export const randomEmail = `foo${Math.random() * 100}@bar.com`

export async function mockUser(app: AppInstance): Promise<User & { _id: mongoose.Types.ObjectId }> {
  const connection = app.mongo.db
  const userModel = new User().getModelForClass(User, { existingConnection: connection })
  const watchListModel = new WatchList().getModelForClass(WatchList, { existingConnection: connection })
  const userSecret = getRandomString(32)

  const user = new userModel({
    username: randomUsername,
    email: randomEmail,
    password: await hash(randomPassword, saltRounds),
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

export async function cleanupCategories(app: AppInstance): Promise<void> {
  const connection = app.mongo.db
  const categoryModel = new Category().getModelForClass(Category, { existingConnection: connection })
  await categoryModel.deleteMany({})
}

export async function cleanupGenres(app: AppInstance): Promise<void> {
  const connection = app.mongo.db
  const genreModel = new Genre().getModelForClass(Genre, { existingConnection: connection })
  await genreModel.deleteMany({})
}

export async function mockLogin(app: AppInstance) {
  const authService = new AuthService(app)
  const { data } = await authService.login(randomUsername, randomPassword)

  return { token: data.token }
}
