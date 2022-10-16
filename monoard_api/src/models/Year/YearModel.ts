import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Year } from '../../../data_types/Year'
import { BaseModel } from '../BaseModel/BaseModel'
import { BudgetModel } from '../Budget/BudgetModel'
import { UserModel } from '../User/UserModel'

@Entity()
export class YearModel extends BaseModel implements Year {
  @Column({ unique: true })
    year: number
  
  @Column()
    active: boolean
  
  @ManyToOne(() => UserModel, user => user.years)
    user?: UserModel

  @OneToMany(() => BudgetModel, budget => budget.year)
    budgets?: BudgetModel[]
}
