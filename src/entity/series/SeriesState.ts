import { prop, Ref } from '@typegoose/typegoose'
import Series from './Series'

export default class SeriesState {
  @prop({ ref: 'Series' })
  series: Ref<Series>

  @prop()
  seasonNumber: number

  @prop()
  episodeNumber: number
}
