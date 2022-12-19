import { Month } from '../../../data_types/Month'
import { rootLens } from '../../RootLens'
import { yearApi } from '../YearReducer'

export const useMoneyMovesByBankAccount = (slug: string, month: Month) => {
  yearApi.endpoints.readActive.useQuery()

  const moneyMoves = rootLens.year.activeYear.moneyMoves.select()

  return moneyMoves.filter(m => m.month === month && m.bankAccount?.slug === slug)
}
