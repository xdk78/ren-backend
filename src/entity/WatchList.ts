import { Typegoose, arrayProp, Ref, ModelType, staticMethod, prop } from '@hasezoey/typegoose'
import User from './User'
import SeriesState from './series/SeriesState'

export enum StatusNumber {
  watching = 1,
  onHold = 2,
  dropped = 3,
  completed = 4,
  planToWatch = 5
}

export default class WatchList extends Typegoose {
  @prop({ ref: User })
  userId: Ref<User>

  @arrayProp({ itemsRef: SeriesState, unique: true })
  watching: Ref<SeriesState>[]

  @arrayProp({ itemsRef: SeriesState, unique: true })
  completed: Ref<SeriesState>[]

  @arrayProp({ itemsRef: SeriesState, unique: true })
  onHold: Ref<SeriesState>[]

  @arrayProp({ itemsRef: SeriesState, unique: true })
  dropped: Ref<SeriesState>[]

  @arrayProp({ itemsRef: SeriesState, unique: true })
  planToWatch: Ref<SeriesState>[]

  @staticMethod
  static addToWatching(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { watching: item } })
  }

  @staticMethod
  static removeFromWatching(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { watching: item } })
  }

  @staticMethod
  static addToCompleted(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { completed: item } })
  }

  @staticMethod
  static removeFromCompleted(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { completed: item } })
  }

  @staticMethod
  static addToOnHold(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { onHold: item } })
  }

  @staticMethod
  static removeFromOnHold(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { onHold: item } })
  }

  @staticMethod
  static addToDropped(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { dropped: item } })
  }

  @staticMethod
  static removeFromDropped(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { dropped: item } })
  }

  @staticMethod
  static addToPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $push: { planToWatch: item } })
  }

  @staticMethod
  static removeFromPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: Ref<WatchList>, item: Ref<SeriesState>) {
    return this.updateOne({ _id: id }, { $pull: { planToWatch: item } })
  }

  @staticMethod
  static updateEpisode(
    this: ModelType<WatchList> & typeof WatchList,
    id: Ref<WatchList>,
    item: Ref<SeriesState>,
    modifyTarget,
    modfiyNumber: number
  ) {
    const findQuery = `${modifyTarget}.seriesId`
    const updateQuery = `${modifyTarget}.$.episodeNumber`
    return this.updateOne({ _id: id, [findQuery]: item }, { $set: { [updateQuery]: modfiyNumber } })
  }
}
