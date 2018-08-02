import { prop, Typegoose, Ref, arrayProp, ModelType, staticMethod } from 'typegoose'
import WatchList from './WatchList'
import SeriesState from './series/SeriesState'

enum Gender {
  OTHER = 'other',
  MALE = 'male',
  FEMALE = 'female',
}

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
  watchList: Ref<WatchList>

  @arrayProp({ itemsRef: SeriesState })
  seriesStates: Ref<SeriesState>[]

  @prop()
  avatar?: string

  @prop({ enum: Gender })
  gender?: Gender

  @prop()
  secret?: string

  @staticMethod
  static destroySessions(this: ModelType<User> & typeof User, id: any, newSecret: string) {
    return this.updateOne({ _id: id }, { $set: { secret: newSecret } })
  }
}
