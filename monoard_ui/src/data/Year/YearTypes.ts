import { yearApiReducer } from './YearReducer'
import { getDefaultApiState } from '../Base/getDefaultApiState'
import { EMPTY_YEAR, Year } from '../../data_types/Year'
import { Budget } from '../../data_types/Budget'

export type YearReducerPath = 'year'
export const yearReducerPath: YearReducerPath = 'year'

export type YearApiReducerPath = 'yearApi'
export const yearApiReducerPath: YearApiReducerPath = 'yearApi'

export type YearApiState = ReturnType<typeof yearApiReducer>

export const defaultYearApiState: YearApiState = getDefaultApiState<YearApiReducerPath>(yearApiReducerPath)

type YearWithExpectedIncomes = Omit<Year, 'budgets'> & {
  budgets: Budget[]
}

export type YearState = {
  activeYear: YearWithExpectedIncomes
  fetched: boolean
}

export const defaultYearState: YearState = {
  activeYear: {
    ...EMPTY_YEAR,
    budgets: [],
  },
  fetched: false,
}
