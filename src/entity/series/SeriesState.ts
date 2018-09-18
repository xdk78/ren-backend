import { prop, Typegoose, Ref } from 'typegoose'
import Series from './Series'

export default class SeriesState extends Typegoose {
  @prop({ ref: Series, unique: true })
  seriesId: Ref<Series>

  @prop()
  seasonNumber: number

  @prop()
  episodeNumber: number
}
