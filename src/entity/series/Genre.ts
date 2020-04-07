import { prop } from '@typegoose/typegoose'

export default class Genre {
  @prop()
  name: string
}
