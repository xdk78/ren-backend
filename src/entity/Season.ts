import { prop, Typegoose, arrayProp, Ref } from 'typegoose'
import { Episode } from './Episode'

export class Season {
  @prop()
  number: number

  @arrayProp({ items: Episode })
  episodes: Episode[]
}
