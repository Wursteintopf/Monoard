import { UserModel } from '../User/UserModel'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Budget } from '../../../data_types/Budget'
import { BaseWithUserModel } from '../BaseModel/BaseWithUserModel'
import { MoneyMoveModel } from '../MoneyMove/MoneyMoveModel'

@Entity()
export class BudgetModel extends BaseWithUserModel implements Budget {
  @Column()
    name: string

  @Column()
    slug: string

  @Column('text')
    keywords: string
  
  @ManyToOne(() => UserModel, user => user.budgets)
    user?: UserModel
  
  @OneToMany(() => MoneyMoveModel, moneyMove => moneyMove.manualBudget)
    manualBudgets?: MoneyMoveModel[]

  @Column('real', { precision: 10, scale: 2 })
    base: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountJan?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountFeb?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountMar?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountApr?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountMay?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountJun?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountJul?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountAug?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountSept?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountOct?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountNov?: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    amountDev?: number
}
