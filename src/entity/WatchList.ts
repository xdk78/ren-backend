import { Typegoose, arrayProp, Ref, ModelType, staticMethod, prop } from 'typegoose'
import User from './User'
import SeriesState from './series/SeriesState'
import Series from './series/Series'

enum StatusNumber {
  watching = 1,
  completed = 2,
  onHold = 3,
  dropped = 4,
  planToWatch = 5,
}

export default class WatchList extends Typegoose {
  @prop({ ref: User })
  userId: Ref<User>

  @arrayProp({ itemsRef: SeriesState })
  watching: Ref<SeriesState>[]

  @arrayProp({ itemsRef: Series })
  completed: Ref<Series>[]

  @arrayProp({ itemsRef: SeriesState })
  onHold: Ref<SeriesState>[]

  @arrayProp({ itemsRef: SeriesState })
  dropped: Ref<SeriesState>[]

  @arrayProp({ itemsRef: Series })
  planToWatch: Ref<Series>[]

  @staticMethod
  static addToWatching(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<SeriesState>) {
    // @ts-ignore
    this.findOne({ _id: id }, { watching: { $elemMatch: { seriesId: item.seriesId } } }).then(res => {
      if (res) {
        throw new Error('Series is already in watching')
      } else {
        return this.update({ _id: id }, { $push: { watching: item } })
      }
    })
  }

  @staticMethod
  static removeFromWatching(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { watching: item } })
  }

  @staticMethod
  static addToCompleted(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    // @ts-ignore
    this.findOne({ _id: id }, { completed: { $elemMatch: { seriesId: item.seriesId } } }).then(res => {
      if (res) {
        throw new Error('Series is already in completed')
      } else {
        return this.update({ _id: id }, { $push: { completed: item } })
      }
    })
  }

  @staticMethod
  static removeFromCompleted(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { completed: item } })
  }

  @staticMethod
  static addToOnHold(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<SeriesState>) {
    // @ts-ignore
    this.findOne({ _id: id }, { onHold: { $elemMatch: { seriesId: item.seriesId } } }).then(res => {
      if (res) {
        throw new Error('Series is already in onHold')
      } else {
        return this.update({ _id: id }, { $push: { onHold: item } })
      }
    })
  }

  @staticMethod
  static removeFromOnHold(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<SeriesState>) {
    return this.update({ _id: id }, { $pull: { onHold: item } })
  }

  @staticMethod
  static addToDropped(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<SeriesState>) {
    // @ts-ignore
    this.findOne({ _id: id }, { dropped: { $elemMatch: { seriesId: item.seriesId } } }).then(res => {
      if (res) {
        throw new Error('Series is already in dropped')
      } else {
        return this.update({ _id: id }, { $push: { dropped: item } })
      }
    })
  }

  @staticMethod
  static removeFromDropped(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<SeriesState>) {
    return this.update({ _id: id }, { $pull: { dropped: item } })
  }

  @staticMethod
  static addToPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    this.findOne({ _id: id }, { planToWatch: { $elemMatch: { seriesId: item.seriesId } } }).then(res => {
      if (res) {
        throw new Error('Series is already in planToWatch')
      } else {
        // @ts-ignore
        return this.update({ _id: id }, { $push: { planToWatch: item } })
      }
    })
  }

  @staticMethod
  static removeFromPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { planToWatch: item } })
  }

  @staticMethod
  static addEpisode(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<SeriesState>, modifyType: number) {
    switch (modifyType) {
      case StatusNumber.watching:
        return this.update({ _id: id, 'watching.seriesId': item.seriesId }, { $inc: { 'watching.$.episodeNumber': 1 } })
      case StatusNumber.dropped:
        return this.update({ _id: id, 'dropped.seriesId': item.seriesId }, { $inc: { 'dropped.$.episodeNumber': 1 } })
      default:
        throw new Error('Wrong status')
    }
  }
}
