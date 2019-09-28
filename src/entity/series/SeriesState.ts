import { prop, Typegoose, Ref } from '@hasezoey/typegoose'
import Series from './Series'

export default class SeriesState extends Typegoose {
  @prop({ ref: Series, unique: true })
  series: Ref<Series>

  @prop()
  seasonNumber: number

  @prop()
  episodeNumber: number
}
