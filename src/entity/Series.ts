import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Genre } from './Genre'
import { Season } from './Season'

@Entity()
export class Series {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column(type => Season)
  seasons: Season[]

  @Column(type => Genre)
  genres: Genre[]

  @Column()
  rating: number
}
