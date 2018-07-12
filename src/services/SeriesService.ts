import BaseService from './BaseService'
import { FastifyInstance } from 'fastify'
import Series from '../entity/series/Series'

export default class SeriesService implements BaseService {
  connection: any
  fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    // @ts-ignore
    this.connection = fastify.mongo.db
  }

  async getSeries(): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const loadedSeries = await seriesModel.find()
      return {
        data: loadedSeries,
        error: '',
      }
    } catch (error) {
      return error.message
    }
  }

  async getSeriesById(id: any): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const loadedSeries = await seriesModel.findOne({ _id: id })
      return {
        data: loadedSeries,
        error: '',
      }
    } catch (error) {
      return error.message
    }
  }

  async createSeries(payload: Series): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const series = new seriesModel(
        {
          title: payload.title,
          description: payload.description,
          seasons: payload.seasons,
          category: payload.category,
          rating: payload.rating,
          genres: payload.genres,
        },
      )

      await series.save()

      return {
        data: { message: 'Added new series ' },
        error: '',
      }
    } catch (error) {
      return error
    }
  }

  async fetchAllSeries(refArray): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const series = []

      for (const reference of refArray) {
        series.push(await seriesModel.findById(reference))
      }
      return series
    } catch (error) {
      return error
    }
  }

}
