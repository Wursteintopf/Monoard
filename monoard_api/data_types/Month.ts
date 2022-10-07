import { Base } from './Base'
import { Budget } from './Budget'

export type monthNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Month extends Base {
  month: monthNumbers
  budgets?: Budget[] | number[]
}
