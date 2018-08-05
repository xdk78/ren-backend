import BaseService from './BaseService'
import { FastifyInstance } from 'fastify'
import Series from '../entity/series/Series'
import { Ref } from 'typegoose'

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
        success: true,
        error: '',
      }
    } catch (error) {
      return error
    }
  }

  async getSeriesById(id: Ref<Series>): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const loadedSeries = await seriesModel.findOne({ _id: id })
      return {
        data: loadedSeries,
        success: true,
        error: '',
      }
    } catch (error) {
      return error
    }
  }

  async doesExist(id: Ref<Series>): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })

      const series = await seriesModel.findById(id)

      if (series) return true
      return false
    } catch (error) {
      return false
    }
  }

  async createSeries(payload: Series): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      const series = new seriesModel(
        {
          title: payload.title,
          description: payload.description,
          seasons: [],
          category: payload.category,
          rating: 0,
          genres: payload.genres,
        },
      )

      await series.save()

      return {
        data: {},
        success: true,
        error: '',
      }
    } catch (error) {
      return error
    }
  }

  async fetchAllSeries(refArray: Ref<Series>[]): Promise<Object> {
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

  async updateSeries(seriesId: Ref<Series>, payload: Series): Promise<Object> {
    try {
      const seriesModel = new Series().getModelForClass(Series, { existingConnection: this.connection })
      await seriesModel.updateOne({ _id: seriesId }, {
        $set: {
          title: payload.title,
          description: payload.description,
          category: payload.category,
          rating: payload.rating,
        },
      })

      return {
        data: {},
        success: true,
        error: '',
      }
    } catch (error) {
      return error
    }
  }

}
