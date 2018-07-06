import { Typegoose, arrayProp, Ref, ModelType, staticMethod, prop } from 'typegoose'
import Series from './Series'
import { ObjectID } from 'bson'
import User from './User'

export default class WatchList extends Typegoose {
  @prop({ ref: User })
  userId: Ref<User>

  @arrayProp({ itemsRef: Series })
  watching: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  completed: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  onHold: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  dropped: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  planToWatch?: Ref<Series>[]

  @staticMethod
  static addToWatching(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $push: { watching: item } })
  }

  @staticMethod
  static removeFromWatching(this: ModelType<WatchList> & typeof WatchList, id: Object, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { watching: item } })
  }

  @staticMethod
  static addToCompleted(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $push: { completed: item } })
  }

  @staticMethod
  static removeFromCompleted(this: ModelType<WatchList> & typeof WatchList, id: Object, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { completed: item } })
  }

  @staticMethod
  static addToOnHold(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $push: { onHold: item } })
  }

  @staticMethod
  static removeFromOnHold(this: ModelType<WatchList> & typeof WatchList, id: Object, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { onHold: item } })
  }

  @staticMethod
  static addToDropped(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $push: { dropped: item } })
  }

  @staticMethod
  static removeFromDropped(this: ModelType<WatchList> & typeof WatchList, id: Object, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { dropped: item } })
  }

  @staticMethod
  static addToPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: any, item: Ref<Series>) {
    return this.update({ _id: id }, { $push: { planToWatch: item } })
  }

  @staticMethod
  static removeFromPlanToWatch(this: ModelType<WatchList> & typeof WatchList, id: Object, item: Ref<Series>) {
    return this.update({ _id: id }, { $pull: { planToWatch: item } })
  }
}
