import { prop, Typegoose } from 'typegoose'

export default class Episode extends Typegoose {
  @prop()
  title: string

  @prop()
  number: number
}
