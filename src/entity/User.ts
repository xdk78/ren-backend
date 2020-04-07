import { prop } from '@typegoose/typegoose'
import WatchList from './WatchList'
import { ObjectId } from 'mongodb'
import { ModelType } from '@typegoose/typegoose/lib/types'

enum Gender {
  OTHER = 'other',
  MALE = 'male',
  FEMALE = 'female',
}

export default class User {
  @prop({ unique: true, required: true })
  username: string

  @prop({
    unique: true,
    required: true,
    // eslint-disable-next-line max-len
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  })
  email: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  createdAt: string

  @prop({ ref: 'WatchList' })
  watchList: WatchList & ObjectId

  @prop()
  avatar?: string

  @prop({ enum: Gender })
  gender?: Gender

  @prop()
  secret?: string

  static destroySessions(this: ModelType<User> & typeof User, id: ObjectId, newSecret: string) {
    return this.updateOne({ _id: id }, { $set: { secret: newSecret } })
  }
}
