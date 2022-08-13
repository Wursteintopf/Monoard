import { UserModel } from '../User/UserModel'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Budget } from '../../../data_types/Budget'
import { BaseWithUserModel } from '../BaseModel/BaseWithUserModel'
import { MoneyMoveModel } from '../MoneyMove/MoneyMoveModel'

@Entity()
export class BudgetModel extends BaseWithUserModel implements Budget {
  @Column()
    name: string

  @Column('text')
    keywords: string
  
  @ManyToOne(() => UserModel, user => user.budgets)
    user?: UserModel
  
  @Column('datetime')
    startMonth: Date

  @Column('datetime')
    endMonth: Date
  
  @OneToMany(() => MoneyMoveModel, moneyMove => moneyMove.manualBudget)
    manualBudgets: MoneyMoveModel[]

  @Column('decimal', { precision: 10, scale: 2 })
    amount: number
}
