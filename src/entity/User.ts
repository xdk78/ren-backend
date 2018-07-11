import { prop, Typegoose, Ref, arrayProp } from 'typegoose'
import WatchList from './WatchList'
import SeriesState from './SeriesState'

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
}
