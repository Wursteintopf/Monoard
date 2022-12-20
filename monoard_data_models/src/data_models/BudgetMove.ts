import { Base } from './Base'
import { Budget } from './Budget'
import { Month } from './Month'
import { User } from './User'

export interface BudgetMove extends Base {
  amount: number
  month: Month
  from?: Budget | number
  to?: Budget | number
  user?: User | number
}
