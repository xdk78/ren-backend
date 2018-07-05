import { prop, Typegoose, staticMethod, ModelType, Ref } from 'typegoose'
import WatchList from './WatchList'
import { ObjectID } from 'bson'

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
