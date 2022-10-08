import { Base } from './Base'
import { Budget } from './Budget'
import { User } from './User'

export interface Year extends Base {
  year: number
  budgets?: Budget[] | number[]
  user?: User | number
}
