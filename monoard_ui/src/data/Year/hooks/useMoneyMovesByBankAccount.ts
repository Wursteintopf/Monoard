import { Month } from '@wursteintopf/monoard_data_models'
import { rootLens } from '../../RootLens'
import { yearApi } from '../YearReducer'

export const useMoneyMovesByBankAccount = (slug: string, month: Month) => {
  yearApi.endpoints.readActive.useQuery()

  const moneyMoves = rootLens.year.activeYear.moneyMoves.select()

  return moneyMoves.filter(m => m.month === month && m.bankAccount?.slug === slug)
}
