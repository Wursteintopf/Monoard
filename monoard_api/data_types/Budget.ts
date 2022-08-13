import { Base } from './Base'

export interface Budget extends Base {
  name: string
  keywords: string
  startMonth: Date
  endMonth: Date
  amount: number
}

export const EMPTY_BUDGET: Budget = {
  name: '',
  keywords: '',
  startMonth: new Date(),
  endMonth: new Date(),
  amount: 0,
}
