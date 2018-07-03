import { Typegoose, arrayProp } from 'typegoose'
import Series from './Series'

export default class WatchList extends Typegoose {
  @arrayProp({ items: Series })
  watching?: Series[]

  @arrayProp({ items: Series })
  completed?: Series[]

  @arrayProp({ items: Series })
  onHold?: Series[]

  @arrayProp({ items: Series })
  dropped?: Series[]

  @arrayProp({ items: Series })
  planToWatch?: Series[]
}
