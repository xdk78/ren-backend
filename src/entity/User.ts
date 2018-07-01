import { prop, arrayProp, Typegoose } from 'typegoose'
import Series from './Series'

export default class User extends Typegoose {
  @prop({ unique: true, required: true })
  username: string

  @prop({ unique: true, required: true })
  email: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  createdAt: string

  @arrayProp({ items: Series })
  series?: Series[]

  @prop()
  avatar?: string
}
