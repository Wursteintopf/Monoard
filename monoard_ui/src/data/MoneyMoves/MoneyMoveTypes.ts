import { getDefaultApiState } from './../Base/getDefaultApiState'
import { moneyMoveApiReducer } from './MoneyMovesReducer'

export type MoneyMoveApiReducerPath = 'moneyMoveApi'
export const moneyMoveApiReducerPath: MoneyMoveApiReducerPath = 'moneyMoveApi'

export type MoneyMoveApiState = ReturnType<typeof moneyMoveApiReducer>

export const defaultMoneyMoveApiState: MoneyMoveApiState = getDefaultApiState<MoneyMoveApiReducerPath>(moneyMoveApiReducerPath)
