import { prop, Typegoose, arrayProp, staticMethod, ModelType, Ref } from 'typegoose'
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
    return this.updateOne({ _id: seriesId }, { $push: { seasons: seasonId } })
  }

  @staticMethod
  static removeSeason(this: ModelType<Series> & typeof Series, seriesId: Ref<Series>, seasonId: Ref<Season>) {
    return this.updateOne({ _id: seriesId }, { $pull: { seasons: seasonId } })
  }

}
