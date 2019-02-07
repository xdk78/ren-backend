import { prop, arrayProp, Typegoose, Ref, staticMethod, ModelType } from 'typegoose'
import Episode from './Episode'

export default class Season extends Typegoose {
  @prop()
  number: number

  @arrayProp({ itemsRef: Episode })
  episodes: Ref<Episode>[]

  @staticMethod
  static addEpisode(this: ModelType<Season> & typeof Season, seasonId: Ref<Season>, episodeId: Ref<Season>) {
    return this.updateOne({ _id: seasonId }, { $push: { episodes: episodeId } })
  }

  @staticMethod
  static removeEpisode(this: ModelType<Season> & typeof Season, seasonId: Ref<Season>, episodeId: Ref<Season>) {
    return this.updateOne({ _id: seasonId }, { $pull: { episodes: episodeId } })
  }
}
