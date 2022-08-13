import { Budget } from '../../data_types/Budget'
import { MoneyMove } from '../../data_types/MoneyMove'
import { getDefaultApiState } from './../Base/getDefaultApiState'
import { moneyMoveApiReducer } from './MoneyMovesReducer'

export type SearchInRangeParams = {
  slug: string
  from: Date
  to: Date
}

export type MoneyMoveReducerPath = 'moneyMove'
export const moneyMoveReducerPath: MoneyMoveReducerPath = 'moneyMove'

export type MoneyMoveApiReducerPath = 'moneyMoveApi'
export const moneyMoveApiReducerPath: MoneyMoveApiReducerPath = 'moneyMoveApi'

export type MoneyMoveApiState = ReturnType<typeof moneyMoveApiReducer>

export const defaultMoneyMoveApiState: MoneyMoveApiState = getDefaultApiState<MoneyMoveApiReducerPath>(moneyMoveApiReducerPath)

export type MoneyMoveState = {
  moneyMovesByBankAccount: MoneyMove[]
  moneyMoves: MoneyMove[]
}

export const defaultMoneyMoveState: MoneyMoveState = {
  moneyMovesByBankAccount: [],
  moneyMoves: [],
}

export type MoneyMoveWithFoundBudget = MoneyMove & { foundBudget: string }
export type BudgetWithCalculatedAmount = Budget & { calculatedAmount: number }
