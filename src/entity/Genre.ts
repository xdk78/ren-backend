import { prop, Typegoose } from 'typegoose'

export default class Genre extends Typegoose {
  @prop()
  name: string
}
