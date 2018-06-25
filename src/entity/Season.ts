import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Episode } from './Episode'

@Entity()
export class Season {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  number: number

  @Column(type => Episode)
  episodes: Episode[]
}
