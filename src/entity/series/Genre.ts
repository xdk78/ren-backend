import { prop, Typegoose } from '@hasezoey/typegoose'

export default class Genre extends Typegoose {
  @prop()
  name: string
}
