import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Genre {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string
}
