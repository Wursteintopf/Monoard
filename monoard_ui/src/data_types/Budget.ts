import { MoneyMove } from './MoneyMove'
import { BudgetCategory } from './BudgetCategory'
import { Base } from './Base'
import { User } from './User'

export interface Budget extends Base {
  name: string
  slug: string
  keywords: string
  base: number
  amountJan?: number
  amountFeb?: number
  amountMar?: number
  amountApr?: number
  amountMay?: number
  amountJun?: number
  amountJul?: number
  amountAug?: number
  amountSept?: number
  amountOct?: number
  amountNov?: number
  amountDec?: number
  manualBudgets?: MoneyMove[] | number[]
  category?: BudgetCategory | number
  user?: User | number
}

export const EMPTY_BUDGET: Budget = {
  name: '',
  slug: '',
  keywords: '',
  base: 0,
}
