import { Column } from 'typeorm'
import { Year } from '../../../data_types/Year'
import { BaseModel } from '../BaseModel/BaseModel'

export class YearModel extends BaseModel implements Year {
  @Column()
    year: number
}
