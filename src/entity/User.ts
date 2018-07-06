import { prop, Typegoose, Ref } from 'typegoose'
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

  @prop({ ref: WatchList })
  watchList?: Ref<WatchList>

  @prop()
  avatar?: string
}
