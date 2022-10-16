import { Base } from './Base'
import { Budget } from './Budget'
import { User } from './User'

export interface Year extends Base {
  year: number
  active: boolean
  budgets?: Budget[] | number[]
  user?: User | number
}

export const EMPTY_YEAR: Year = {
  year: 0,
  active: false,
  budgets: [],
}
