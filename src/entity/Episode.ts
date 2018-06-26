import { prop, Typegoose } from 'typegoose'

export class Episode {
  @prop()
  title: string

  @prop()
  number: number
}
