import { BudgetCategory } from './BudgetCategory'
import { Base } from './Base'

export interface Budget extends Base {
  name: string
  slug: string
  keywords: string
  amount: number
  category?: BudgetCategory | number
}

export const EMPTY_BUDGET: Budget = {
  name: '',
  slug: '',
  keywords: '',
  amount: 0,
}
