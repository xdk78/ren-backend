import BaseService from './BaseService'
import Series from '../entity/series/Series'
import { getModelForClass, Ref } from '@typegoose/typegoose'
import Category from '../entity/series/Category'
import Episode from '../entity/series/Episode'
import Genre from '../entity/series/Genre'
import Season from '../entity/series/Season'
import { AppInstance } from '../'
import { Connection } from 'mongoose'
import { ObjectId } from 'mongodb'

export default class SeriesService implements BaseService {
  connection: Connection
  fastify: AppInstance

  constructor(fastify: AppInstance) {
    this.connection = fastify.mongo.db
  }

  async getSeries() {
    try {
      const seriesModel = getModelForClass(Series, { existingConnection: this.connection })
      const loadedSeries = await seriesModel.find()
      return {
        data: loadedSeries,
      }
    } catch (error) {
      throw error
    }
  }

  async getSeriesById(id: ObjectId) {
    try {
      const seriesModel = getModelForClass(Series, { existingConnection: this.connection })
      const loadedSeries = await seriesModel.findOne({ _id: id })
      return {
        data: loadedSeries,
      }
    } catch (error) {
      throw error
    }
  }

  async doesExist<T>(id: ObjectId | Ref<T>): Promise<boolean> {
    try {
      const seriesModel = getModelForClass(Series, { existingConnection: this.connection })

      const series = await seriesModel.findById(id)

      if (series) return true
      return false
    } catch (error) {
      return false
    }
  }

  async createSeries(payload: Series) {
    try {
      const seriesModel = getModelForClass(Series, { existingConnection: this.connection })
      const series = await seriesModel.create({
        title: payload.title,
        description: payload.description,
        seasons: [],
        category: payload.category,
        rating: 0,
        genres: payload.genres,
      })

      return {
        data: series,
      }
    } catch (error) {
      throw error
    }
  }

  async getAllSeries(refArray: ObjectId[]) {
    try {
      const seriesModel = getModelForClass(Series, { existingConnection: this.connection })
      const series = []

      for (const reference of refArray) {
        series.push(await seriesModel.findById(reference))
      }
      return series
    } catch (error) {
      throw error
    }
  }

  async updateSeries(seriesId: ObjectId, payload: Series) {
    try {
      const seriesModel = getModelForClass(Series, { existingConnection: this.connection })

      await seriesModel.updateOne(
        { _id: seriesId },
        {
          $set: {
            title: payload.title,
            description: payload.description,
            category: payload.category,
            rating: payload.rating,
          },
        }
      )

      return {
        data: {},
      }
    } catch (error) {
      throw error
    }
  }

  async createCategory(name: string) {
    try {
      const categoryModel = getModelForClass(Category, { existingConnection: this.connection })
      const category = await categoryModel.create({
        name,
      })

      return { data: category }
    } catch (error) {
      throw error
    }
  }

  async getCategories(): Promise<{ data: Category[] }> {
    try {
      const categoryModel = getModelForClass(Category, { existingConnection: this.connection })

      return { data: await categoryModel.find() }
    } catch (error) {
      throw error
    }
  }

  async createEpisode(title: string, number: number) {
    try {
      const episodeModel = getModelForClass(Episode, { existingConnection: this.connection })
      const episode = await episodeModel.create({
        title,
        number,
      })

      return { data: episode }
    } catch (error) {
      throw error
    }
  }

  async createGenre(name: string) {
    try {
      const genreModel = getModelForClass(Genre, { existingConnection: this.connection })
      const genre = await genreModel.create({
        name,
      })

      return { data: genre }
    } catch (error) {
      throw error
    }
  }

  async getGenres() {
    try {
      const genreModel = getModelForClass(Genre, { existingConnection: this.connection })

      return { data: await genreModel.find() }
    } catch (error) {
      throw error
    }
  }

  async createSeason(number: number, episodes: Ref<Episode>[]) {
    try {
      const seasonModel = getModelForClass(Season, { existingConnection: this.connection })
      const season = await seasonModel.create({
        number,
        episodes,
      })

      return { data: season }
    } catch (error) {
      throw error
    }
  }
}
