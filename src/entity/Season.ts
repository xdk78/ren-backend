import { prop, arrayProp } from 'typegoose'
import Episode from './Episode'

export default class Season {
  @prop()
  number: number

  @arrayProp({ items: Episode })
  episodes: Episode[]
}
