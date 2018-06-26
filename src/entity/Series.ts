import { prop, Typegoose, arrayProp } from 'typegoose'
import Genre from './Genre'
import Season from './Season'
import Category from './Category'

export default class Series extends Typegoose {
  @prop({ unique: true })
  id: string

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
}
