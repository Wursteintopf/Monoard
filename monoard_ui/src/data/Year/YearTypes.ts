import { yearApiReducer } from './YearReducer'
import { getDefaultApiState } from '../Base/getDefaultApiState'

export type YearReducerPath = 'yearApi'
export const yearReducerPath: YearReducerPath = 'yearApi'

export type YearApiState = ReturnType<typeof yearApiReducer>

export const defaultYearApiState: YearApiState = getDefaultApiState<YearReducerPath>(yearReducerPath)
