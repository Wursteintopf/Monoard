import { Role } from '../../../data_types/Role'
import { Entity, Column, OneToMany } from 'typeorm'
import { BudgetModel } from '../Budget/BudgetModel'
import { User } from '../../../data_types/User'
import { BankAccountModel } from '../BankAccount/BankAccountModel'
import { MoneyMoveModel } from '../MoneyMove/MoneyMoveModel'
import { BaseUserModel } from '../BaseModel/BaseUserModel'
import { YearModel } from '../Year/YearModel'

@Entity()
export class UserModel extends BaseUserModel implements User {
  @Column({ unique: true })
    username: string

  @Column()
    password: string

  @Column()
    salt: string

  @Column()
    role: Role

  @OneToMany(() => BudgetModel, (budget) => budget.user)
    budgets: BudgetModel[]

  @OneToMany(() => BankAccountModel, (bankAccount) => bankAccount.user)
    bankAccounts: BankAccountModel[]

  @OneToMany(() => MoneyMoveModel, (moneyMove) => moneyMove.user)
    moneyMoves: MoneyMoveModel[]
    
  @OneToMany(() => YearModel, (year) => year.user)
    years: YearModel[]
}
