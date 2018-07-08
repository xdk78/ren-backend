import { prop, Typegoose, Ref } from 'typegoose'
import WatchList from './WatchList'

export default class User extends Typegoose {
  @prop({ unique: true, required: true })
  username: string

  @prop({ unique: true, required: true, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })
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
