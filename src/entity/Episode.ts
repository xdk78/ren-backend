import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Episode {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  number: number
}
