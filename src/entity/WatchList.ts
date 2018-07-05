import { Typegoose, arrayProp, Ref, ModelType, staticMethod, prop } from 'typegoose'
import Series from './Series'
import { ObjectID } from 'bson'
import User from './User'

export default class WatchList extends Typegoose {
  @prop({ ref: User })
  userId: Ref<User>

  @arrayProp({ itemsRef: Series })
  watching?: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  completed?: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  onHold?: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  dropped?: Ref<Series>[]

  @arrayProp({ itemsRef: Series })
  planToWatch?: Ref<Series>[]

  @staticMethod
  static addToWatching(this: ModelType<WatchList> & typeof WatchList, id: ObjectID, items: Ref<Series>[]) {
    return this.update({ _id: id }, { $push: { watching: items } })
  }

  @staticMethod
  static removeFromWatching(this: ModelType<WatchList> & typeof WatchList, id: ObjectID, items: Ref<Series>[]) {
    return this.update({ _id: id }, { $pull: { watching: items } })
  }
}
