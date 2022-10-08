import { Base } from './Base'
import { Budget } from './Budget'
import { User } from './User'

export interface BudgetCategory extends Base {
  name: string
  budgets?: Budget[] | number[]
  user?: User | number
}
