import { prop, Typegoose } from '@hasezoey/typegoose'

export default class Category extends Typegoose {
  @prop()
  name: string
}
