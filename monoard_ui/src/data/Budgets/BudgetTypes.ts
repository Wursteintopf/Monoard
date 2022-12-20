import { Budget } from '@wursteintopf/monoard_data_models'
import { getDefaultApiState } from '../Base/getDefaultApiState'
import { budgetApiReducer } from './BudgetReducer'

export type SearchInMonthParams = {
  month: Date
}

export type BudgetReducerPath = 'budget'
export const budgetReducerPath: BudgetReducerPath = 'budget'

export type BudgetApiReducerPath = 'budgetApi'
export const budgetApiReducerPath: BudgetApiReducerPath = 'budgetApi'

export type BudgetApiState = ReturnType<typeof budgetApiReducer>

export const defaultBudgetApiState: BudgetApiState = getDefaultApiState<BudgetApiReducerPath>(budgetApiReducerPath)

export type BudgetState = {
  currentBudgets: Budget[]
}

export const defaultBudgetState: BudgetState = {
  currentBudgets: [],
}
