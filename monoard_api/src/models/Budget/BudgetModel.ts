import { UserModel } from '../User/UserModel'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Budget } from '../../../data_types/Budget'
import { BaseWithUserModel } from '../BaseModel/BaseWithUserModel'
import { MoneyMoveModel } from '../MoneyMove/MoneyMoveModel'
import { YearModel } from '../Year/YearModel'

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

  @ManyToOne(() => YearModel, year => year.budgets)
    year?: YearModel
  
  @Column()
    isIncome: boolean
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    base: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    january: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    february: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    march: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    april: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    may: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    june: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    july: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    august: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    september: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    october: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    november: number
  
  @Column('real', { precision: 10, scale: 2, nullable: true })
    december: number
}
