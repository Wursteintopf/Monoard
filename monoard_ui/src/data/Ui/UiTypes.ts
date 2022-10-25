import { Month, monthAtIndex, MonthIndices } from '../../data_types/Month'
import moment from 'moment'

export type UiState = {
  selectedMonth: Month
}

export const defaultUiState: UiState = {
  selectedMonth: monthAtIndex[moment().month() as MonthIndices],
}
