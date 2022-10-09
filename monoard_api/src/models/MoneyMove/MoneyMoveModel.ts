import { Column, Entity, ManyToOne } from 'typeorm'
import { MoneyMove } from '../../../data_types/MoneyMove'
import { BankAccountModel } from '../BankAccount/BankAccountModel'
import { BaseWithUserModel } from '../BaseModel/BaseWithUserModel'
import { BudgetModel } from '../Budget/BudgetModel'
import { UserModel } from '../User/UserModel'

@Entity()
export class MoneyMoveModel extends BaseWithUserModel implements MoneyMove {
  @Column('datetime')
    date: Date

  @Column()
    foreignBankAccount: string
  
  @Column()
    foreignBankAccountIban: string
  
  @Column()
    purpose: string

  @Column('real', { precision: 10, scale: 2 })
    amount: number
  
  @Column()
    isInternalMove: boolean
    
  @ManyToOne(() => BudgetModel, budget => budget.manualBudgets)
    manualBudget?: BudgetModel
  
  @ManyToOne(() => UserModel, user => user.moneyMoves)
    user?: UserModel
  
  @ManyToOne(() => BankAccountModel, bankAccount => bankAccount.moneyMoves)
    bankAccount: BankAccountModel
}
