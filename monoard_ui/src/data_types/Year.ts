import { Base } from './Base'
import { Budget } from './Budget'
import { MoneyMove } from './MoneyMove'
import { User } from './User'

export interface Year extends Base {
  year: number
  active: boolean
  budgets?: Budget[] | number[]
  moneyMoves?: MoneyMove[] | number[]
  user?: User | number
}

export const EMPTY_YEAR = {
  year: 0,
  active: false,
  moneyMoves: [],
  budgets: [],
}
