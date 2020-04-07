import { arrayProp, Ref, prop } from '@typegoose/typegoose'
import SeriesState from './series/SeriesState'
import { ObjectId } from 'mongodb'
import { ModelType } from '@typegoose/typegoose/lib/types'

export enum StatusNumber {
  watching = 1,
  onHold = 2,
  dropped = 3,
  completed = 4,
  planToWatch = 5,
}

export default class WatchList {
  @prop({ ref: 'User' })
  userId: ObjectId

  @arrayProp({ itemsRef: 'SeriesState', unique: true })
  watching: SeriesState[] | any

  @arrayProp({ itemsRef: 'SeriesState', unique: true })
  completed: SeriesState[] | any

  @arrayProp({ itemsRef: 'SeriesState', unique: true })
  onHold: SeriesState[] | any

  @arrayProp({ itemsRef: 'SeriesState', unique: true })
  dropped: SeriesState[] | any

  @arrayProp({ itemsRef: 'SeriesState', unique: true })
  planToWatch: SeriesState[] | any

  static addToWatching(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { watching: item } })
  }

  static removeFromWatching(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { watching: item } })
  }

  static addToCompleted(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { completed: item } })
  }

  static removeFromCompleted(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { completed: item } })
  }

  static addToOnHold(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { onHold: item } })
  }

  static removeFromOnHold(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { onHold: item } })
  }

  static addToDropped(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { dropped: item } })
  }

  static removeFromDropped(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { dropped: item } })
  }

  static addToPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { planToWatch: item } })
  }

  static removeFromPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: ObjectId, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { planToWatch: item } })
  }

  static updateEpisode(
    this: ModelType<WatchList> & typeof WatchList,
    id: ObjectId,
    item: Ref<SeriesState>,
    modifyTarget,
    modfiyNumber: number
  ) {
    const findQuery = `${modifyTarget}.seriesId`
    const updateQuery = `${modifyTarget}.$.episodeNumber`
    return this.updateOne({ _id: id, [findQuery]: item }, { $set: { [updateQuery]: modfiyNumber } })
  }
}
