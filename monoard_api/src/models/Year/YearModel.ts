import { BaseModel } from '@wursteintopf/crudpress'
import { Year } from '@wursteintopf/monoard_data_models'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { BudgetModel } from '../Budget/BudgetModel'
import { MoneyMoveModel } from '../MoneyMove/MoneyMoveModel'
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
  
  @OneToMany(() => MoneyMoveModel, moneyMove => moneyMove.year)
    moneyMoves?: MoneyMoveModel[]
}
