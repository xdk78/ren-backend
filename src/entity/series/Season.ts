import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import Episode from './Episode'
import { ObjectId } from 'mongodb'
import { ModelType } from '@typegoose/typegoose/lib/types'

export default class Season {
  @prop()
  number: number

  @arrayProp({ itemsRef: 'Episode' })
  episodes: Ref<Episode>[] | any

  static addEpisode(this: ModelType<Season> & typeof Season, seasonId: ObjectId, episodeId: Ref<Season>) {
    return this.updateOne({ _id: seasonId }, { $push: { episodes: episodeId } })
  }

  static removeEpisode(this: ModelType<Season> & typeof Season, seasonId: ObjectId, episodeId: ObjectId) {
    return this.updateOne({ _id: seasonId }, { $pull: { episodes: episodeId } })
  }
}
