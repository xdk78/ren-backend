import { prop, Typegoose, arrayProp, staticMethod , ModelType } from 'typegoose'
import Genre from './Genre'
import Season from './Season'
import Category from './Category'

export default class Series extends Typegoose {
  @prop()
  title: string

  @prop()
  description?: string

  @arrayProp({ items: Season })
  seasons: Season[]

  @prop()
  category?: Category

  @arrayProp({ items: Genre })
  genres?: Genre[]

  @prop()
  rating: number

  @staticMethod
  static findSeries(this: ModelType<Series> & typeof Series, seriesId: number) {
    return this.findOne({ _id: seriesId })
  }
}
