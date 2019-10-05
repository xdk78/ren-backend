import BaseService from './BaseService'
import Series from '../entity/series/Series'
import { Ref } from '@hasezoey/typegoose'
import Category from '../entity/series/Category'
import Episode from '../entity/series/Episode'
import Genre from '../entity/series/Genre'
import Season from '../entity/series/Season'
import { AppInstance } from '../'
import { Connection } from 'mongoose'

export default class SeriesService implements BaseService {
  connection: Connection
  fastify: AppInstance

  constructor(fastify: AppInstance) {
    this.connection = fastify.mongo.db
  }

  async getSeries(): Promise<object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const loadedSeries = await seriesModel.find()
      return {
        data: loadedSeries
      }
    } catch (error) {
      throw error
    }
  }

  async getSeriesById(id: Ref<Series>): Promise<object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const loadedSeries = await seriesModel.findOne({ _id: id })
      return {
        data: loadedSeries
      }
    } catch (error) {
      throw error
    }
  }

  async doesExist(id: Ref<Series>): Promise<boolean> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })

      const series = await seriesModel.findById(id)

      if (series) return true
      return false
    } catch (error) {
      return false
    }
  }

  async createSeries(payload: Series): Promise<object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const series = new seriesModel({
        title: payload.title,
        description: payload.description,
        seasons: [],
        category: payload.category,
        rating: 0,
        genres: payload.genres
      })

      await series.save()

      return {
        data: {}
      }
    } catch (error) {
      throw error
    }
  }

  async getAllSeries(refArray: Ref<Series>[]): Promise<object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const series = []

      for (const reference of refArray) {
        series.push(await seriesModel.findById(reference))
      }
      return series
    } catch (error) {
      throw error
    }
  }

  async updateSeries(seriesId: Ref<Series>, payload: Series): Promise<object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })

      await seriesModel.updateOne(
        { _id: seriesId },
        {
          $set: {
            title: payload.title,
            description: payload.description,
            category: payload.category,
            rating: payload.rating
          }
        }
      )

      return {
        data: {}
      }
    } catch (error) {
      throw error
    }
  }

  async createCategory(name: string): Promise<object> {
    try {
      const categoryModel = new Category().getModelForClass(Category, { existingConnection: this.connection })
      const category = new categoryModel({
        name
      })

      return { data: await category.save() }
    } catch (error) {
      throw error
    }
  }

  async getCategories(): Promise<{ data: Category[] }> {
    try {
      const categoryModel = new Category().getModelForClass(Category, { existingConnection: this.connection })

      return { data: await categoryModel.find() }
    } catch (error) {
      throw error
    }
  }

  async createEpisode(title: string, number: number): Promise<object> {
    try {
      const episodeModel = new Episode().getModelForClass(Episode, { existingConnection: this.connection })
      const episode = new episodeModel({
        title,
        number
      })

      return { data: await episode.save() }
    } catch (error) {
      throw error
    }
  }

  async createGenre(name: string): Promise<object> {
    try {
      const genreModel = new Genre().getModelForClass(Genre, { existingConnection: this.connection })
      const genre = new genreModel({
        name
      })

      return { data: await genre.save() }
    } catch (error) {
      throw error
    }
  }

  async getGenres(): Promise<{ data: Genre[] }> {
    try {
      const genreModel = new Genre().getModelForClass(Genre, { existingConnection: this.connection })

      return { data: await genreModel.find() }
    } catch (error) {
      throw error
    }
  }

  async createSeason(number: number, episodes: any[]): Promise<object> {
    try {
      const seasonModel = new Season().getModelForClass(Season, { existingConnection: this.connection })
      const season = new seasonModel({
        number,
        episodes
      })

      return { data: await season.save() }
    } catch (error) {
      throw error
    }
  }
}
