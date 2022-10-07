import { Base } from './Base'
import { Budget } from './Budget'

export interface BudgetCategory extends Base {
  name: string
  budgets?: Budget[] | number[]
}
