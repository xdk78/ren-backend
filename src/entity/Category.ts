import { prop, Typegoose } from 'typegoose'

export default class Category extends Typegoose {
  @prop()
  name: string
}
