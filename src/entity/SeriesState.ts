import { prop, Typegoose, Ref } from 'typegoose'
import Series from './Series'

export default class SeriesState extends Typegoose {
  @prop({ ref: Series })
  seriesId: Ref<Series>

  @prop()
  episodeNumber?: number
}
