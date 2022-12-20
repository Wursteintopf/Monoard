import { Month, monthAtIndex, MonthIndices } from '@wursteintopf/monoard_data_models'
import moment from 'moment'

export type UiState = {
  selectedMonth: Month
}

export const defaultUiState: UiState = {
  selectedMonth: monthAtIndex[moment().month() as MonthIndices],
}
