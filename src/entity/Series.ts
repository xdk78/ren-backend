import { prop, Typegoose, arrayProp, Ref } from 'typegoose'
import { Genre } from './Genre'
import { Season } from './Season'

export class Series extends Typegoose {
  @prop({ unique: true })
  id: string

  @prop()
  title: string

  @arrayProp({ items: Season })
  seasons: Season[]

  @arrayProp({ items: Genre })
  genres: Genre[]

  @prop()
  rating: number
}
