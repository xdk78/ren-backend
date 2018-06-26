import { prop } from 'typegoose'

export default class Episode {
  @prop()
  title: string

  @prop()
  number: number
}
