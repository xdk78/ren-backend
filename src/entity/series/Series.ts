import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import Genre from './Genre'
import Season from './Season'
import Category from './Category'
import { ObjectId } from 'mongodb'
import { ModelType } from '@typegoose/typegoose/lib/types'

export default class Series {
  @prop()
  title: string

  @prop()
  description?: string

  @arrayProp({ itemsRef: 'Season' })
  seasons: Ref<Season>[]

  @prop({ ref: Category })
  category?: Ref<Category>

  @arrayProp({ itemsRef: 'Genre' })
  genres?: Ref<Genre>[]

  @prop({ default: 0 })
  rating: number

  static findSeries(this: ModelType<Series> & typeof Series, seriesId: ObjectId) {
    return this.findOne({ _id: seriesId })
  }

  static addSeason(this: ModelType<Series> & typeof Series, seriesId: ObjectId, seasonId: Ref<Season>) {
    return this.updateOne({ _id: seriesId }, { $push: { seasons: seasonId } })
  }

  static removeSeason(this: ModelType<Series> & typeof Series, seriesId: ObjectId, seasonId: Ref<Season>) {
    return this.updateOne({ _id: seriesId }, { $pull: { seasons: seasonId } })
  }

  static setCategory(this: ModelType<Series> & typeof Series, seriesId: ObjectId, categoryId: Ref<Category>) {
    return this.updateOne({ _id: seriesId }, { $set: { category: categoryId } })
  }

  static removeCategory(this: ModelType<Series> & typeof Series, seriesId: ObjectId, categoryId: Ref<Category>) {
    return this.updateOne({ _id: seriesId }, { $unset: { category: categoryId } })
  }

  static addGenre(this: ModelType<Series> & typeof Series, seriesId: ObjectId, genreId: Ref<Genre>) {
    return this.updateOne({ _id: seriesId }, { $push: { genres: genreId } })
  }

  static removeGenre(this: ModelType<Series> & typeof Series, seriesId: ObjectId, genreId: Ref<Genre>) {
    return this.updateOne({ _id: seriesId }, { $pull: { genres: genreId } })
  }

  static setRating(this: ModelType<Series> & typeof Series, seriesId: ObjectId, rating: number) {
    return this.updateOne({ _id: seriesId }, { $set: { rating: rating } })
  }

  static incrementRating(this: ModelType<Series> & typeof Series, seriesId: ObjectId, incrementSize: number) {
    return this.updateOne({ _id: seriesId }, { $inc: { rating: incrementSize } })
  }

  static setTitle(this: ModelType<Series> & typeof Series, seriesId: ObjectId, title: string) {
    return this.updateOne({ _id: seriesId }, { $set: { title: title } })
  }

  static setDescription(this: ModelType<Series> & typeof Series, seriesId: ObjectId, description: string) {
    return this.updateOne({ _id: seriesId }, { $set: { description: description } })
  }
}
