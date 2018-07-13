import { prop, arrayProp, Typegoose } from 'typegoose'
import Episode from './Episode'

export default class Season extends Typegoose {
  @prop()
  number: number

  @arrayProp({ items: Episode })
  episodes: Episode[]
}
