import { Typegoose, arrayProp, Ref } from 'typegoose'
import Series from './Series'

export default class WatchList extends Typegoose {
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
}
