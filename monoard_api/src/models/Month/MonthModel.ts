import { Month, monthNumbers } from './../../../data_types/Month'
import { BaseModel } from '../BaseModel/BaseModel'
import { Column } from 'typeorm'

export class MonthModel extends BaseModel implements Month {
  @Column()
    month: monthNumbers
}
