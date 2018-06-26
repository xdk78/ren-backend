import { prop, arrayProp } from 'typegoose'
import Series from './Series'

export default class User {
  @prop({ unique: true })
    id: string

  @prop({ unique: true })
    username: string

  @prop({ unique: true })
    email: string

  @prop()
    password: string

  @arrayProp({ items: Series })
    series: Series[]
}
