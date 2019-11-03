import { AppInstance } from '../src'
import User from '../src/entity/User'
import WatchList from '../src/entity/WatchList'
import { getRandomString } from '../src/utils/authUtils'
import { hash } from 'bcrypt'
import Category from '../src/entity/series/Category'
import Genre from '../src/entity/series/Genre'
import mongoose from 'mongoose'
import AuthService from '../src/services/AuthService'
import SeriesService from '../src/services/SeriesService'
import Series from '../src/entity/series/Series'

const saltRounds = 10

export const randomUsername = `foo${Math.random() * 100}`
export const randomPassword = `foobar${Math.random() * 100}`
export const randomEmail = `foo${Math.random() * 100}@bar.com`
export const randomGenreName = `foo_genre_name${Math.random() * 100}`
export const randomCategoryName = `foo_category_name${Math.random() * 100}`
export const randomEpisodeTitle = `foo_episode_title${Math.random() * 100}`
export const randomSeriesTitle = `foo_series_title${Math.random() * 100}`
export const randomSeriesDescription = `foo_series_description${Math.random() * 100}`

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

export async function cleanupSeries(app: AppInstance): Promise<void> {
  const connection = app.mongo.db
  const seriesModel = new Series().getModelForClass(Series, { existingConnection: connection })
  await seriesModel.deleteMany({})
}

export async function mockLogin(app: AppInstance) {
  const authService = new AuthService(app)
  const { data } = await authService.login(randomUsername, randomPassword)

  return { token: data.token }
}

export async function mockGenre(app: AppInstance) {
  const seriesService = new SeriesService(app)
  const { data } = await seriesService.createGenre(randomGenreName)

  return data
}

export async function mockCategory(app: AppInstance) {
  const seriesService = new SeriesService(app)
  const { data } = await seriesService.createCategory(randomCategoryName)

  return data
}

export async function mockEpisode(app: AppInstance) {
  const seriesService = new SeriesService(app)
  const { data } = await seriesService.createEpisode(randomEpisodeTitle, Math.round(Math.random() * 100))

  return data
}

export async function mockSeries(app: AppInstance) {
  const seriesService = new SeriesService(app)
  const category = await seriesService.createCategory(randomCategoryName)
  const genre = await seriesService.createGenre(randomGenreName)

  const { data } = await seriesService.createSeries({
    title: randomSeriesTitle,
    description: randomSeriesDescription,
    category: category.data._id,
    genres: [genre.data._id]
  } as Series)

  return data
}

export async function cleanupAll(app: AppInstance) {
  await cleanupGenres(app)
  await cleanupCategories(app)
  await cleanupSeries(app)
  await cleanupUsers(app)
}
