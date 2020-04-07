import { prop } from '@typegoose/typegoose'

export default class Category {
  @prop()
  name: string
}
