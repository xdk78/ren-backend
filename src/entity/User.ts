import { prop, Typegoose } from 'typegoose'
import WatchList from './WatchList'

export default class User extends Typegoose {
  @prop({ unique: true, required: true })
  username: string

  @prop({ unique: true, required: true })
  email: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  createdAt: string

  @prop()
  watchList?: WatchList

  @prop()
  avatar?: string
}
