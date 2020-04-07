import { prop } from '@typegoose/typegoose'

export default class Episode {
  @prop()
  title: string

  @prop()
  number: number
}
