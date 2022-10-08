import { MoneyMove } from './MoneyMove'
import { BudgetCategory } from './BudgetCategory'
import { Base } from './Base'
import { User } from './User'

export interface Budget extends Base {
  name: string
  slug: string
  keywords: string
  base: number
  amount: number
  manualBudgets?: MoneyMove[] | number[]
  category?: BudgetCategory | number
  user?: User | number
}

export const EMPTY_BUDGET: Budget = {
  name: '',
  slug: '',
  keywords: '',
  base: 0,
  amount: 0,
}
