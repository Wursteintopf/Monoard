import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BaseModel {
  @PrimaryGeneratedColumn()
    id: number

  public setAll (props: any) {
    Object.keys(props).forEach(key => {
      // @ts-expect-error
      if (key !== 'id') this[key] = props[key]
    })
  }
}
