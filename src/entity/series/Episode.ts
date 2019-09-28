import { prop, Typegoose } from '@hasezoey/typegoose'

export default class Episode extends Typegoose {
  @prop()
  title: string

  @prop()
  number: number
}
