import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Series {

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  episodes: number

}
