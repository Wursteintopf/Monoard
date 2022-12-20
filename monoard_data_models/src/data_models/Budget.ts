import { MoneyMove } from './MoneyMove'
import { BudgetCategory } from './BudgetCategory'
import { Base } from './Base'
import { User } from './User'
import { Year } from './Year'

export interface Budget extends Base {
  name: string
  slug: string
  keywords: string
  isIncome: boolean
  base: number
  january: number
  february: number
  march: number
  april: number
  may: number
  june: number
  july: number
  august: number
  september: number
  october: number
  november: number
  december: number
  manualBudgets?: MoneyMove[] | number[]
  category?: BudgetCategory | number
  year?: Year | number
  user?: User | number
}

export const EMPTY_BUDGET: Budget = {
  name: '',
  slug: '',
  keywords: '',
  isIncome: false,
  base: 0,
  january: 0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
}
