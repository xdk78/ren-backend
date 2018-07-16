import { prop, Typegoose, arrayProp, staticMethod, ModelType, Ref, instanceMethod } from 'typegoose'
import Genre from './Genre'
import Season from './Season'
import Category from './Category'

export default class Series extends Typegoose {
  @prop()
  title: string

  @prop()
  description?: string

  @arrayProp({ itemsRef: Season })
  seasons: Ref<Season>[]

  @prop({ ref: Category })
  category?: Ref<Category>

  @arrayProp({ itemsRef: Genre })
  genres?: Ref<Genre>[]

  @prop()
  rating: number

  @staticMethod
  static findSeries(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>) {
    return this.findOne({ _id: seriesId })
  }

  @staticMethod
  static addSeason(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, seasonId: Ref<Season>) {
    return this.update({ _id: seriesId }, { $push: { seasons: seasonId } })
  }

  @staticMethod
  static removeSeason(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, seasonId: Ref<Season>) {
    return this.update({ _id: seriesId }, { $pull: { seasons: seasonId } })
  }

  @staticMethod
  static setCategory(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, categoryId: Ref<Category>) {
    return this.updateOne({ _id: seriesId }, { $set: { category: categoryId } })
  }

  @staticMethod
  static removeCategory(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, categoryId: Ref<Category>) {
    return this.updateOne({ _id: seriesId }, { $unset: { category: categoryId } })
  }

  @staticMethod
  static addGenre(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, genreId: Ref<Genre>) {
    return this.update({ _id: seriesId }, { $push: { genres: genreId } })
  }

  @staticMethod
  static removeGenre(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, genreId: Ref<Genre>) {
    return this.update({ _id: seriesId }, { $pull: { genres: genreId } })
  }

  @staticMethod
  static setRating(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, rating: number) {
    return this.updateOne({ _id: seriesId }, { $set: { rating: rating } })
  }

  @staticMethod
  static incrementRating(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, incrementSize: number) {
    return this.updateOne({ _id: seriesId }, { $inc: { rating: incrementSize } })
  }

}
