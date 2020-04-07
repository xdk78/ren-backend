import { prop } from '@typegoose/typegoose'
import Series from './Series'

export default class SeriesState {
  @prop({ ref: 'Series', unique: true })
  series: Series | any

  @prop()
  seasonNumber: number

  @prop()
  episodeNumber: number
}
