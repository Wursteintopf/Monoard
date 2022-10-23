import { MoneyMove } from './../../data_types/MoneyMove'
import { yearApiReducer } from './YearReducer'
import { getDefaultApiState } from '../Base/getDefaultApiState'
import { EMPTY_YEAR, Year } from '../../data_types/Year'
import { Budget } from '../../data_types/Budget'
import { Month } from '../../data_types/Month'

export type YearReducerPath = 'year'
export const yearReducerPath: YearReducerPath = 'year'

export type YearApiReducerPath = 'yearApi'
export const yearApiReducerPath: YearApiReducerPath = 'yearApi'

export type YearApiState = ReturnType<typeof yearApiReducer>

export const defaultYearApiState: YearApiState = getDefaultApiState<YearApiReducerPath>(yearApiReducerPath)

type SumMonth = `sum_${Month}`
export type BudgetWithSums = Budget & Record<SumMonth, number>

type YearWithBudgetsAndMoves = Omit<Year, 'budgets' | 'moneyMoves'> & {
  budgets: Budget[]
  moneyMoves: MoneyMove[]
}

export type MonthBudget = {
  id: number
  name: string
  slug: string
  base: number
  amount: number
  spent: number
}

export type MonthIncomeBudget = MonthBudget

export type Expense = {
  date: Date
  month: Month
  foreignBankAccount: string
  foreignBankAccountIban: string
  purpose: string
  amount: number
  isInternalMove: boolean
  budget?: Budget
}

export type Income = Expense

export type MonthData = {
  expenses: Expense[]
  incomes: Income[]
  budgets: MonthBudget[]
  incomeBudgets: MonthIncomeBudget[]
  sumBudgetsAdded: number
  sumIncomeBudgetsAdded: number
  sumExpenses: number
  sumIncomes: number
}

export type YearByMonths = {
  id: number
  year: number
  months: Record<Month, MonthData>
  budgets: Budget[]
  incomeBudgets: Budget[]
}

export type MoneyMoveWithBudget = Omit<MoneyMove, 'budget'> & {
  budget?: Budget
}

export type YearState = {
  activeYear: YearWithBudgetsAndMoves
  fetched: boolean
}

export const defaultYearState: YearState = {
  activeYear: EMPTY_YEAR,
  fetched: false,
}
