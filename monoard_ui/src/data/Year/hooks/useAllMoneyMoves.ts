import { MoneyMove } from '@wursteintopf/monoard_data_models'
import { yearApi } from '../YearReducer'

export const useAllMoneyMoves = () => {
  const { data: year, isLoading } = yearApi.endpoints.readActive.useQuery()

  const moneyMoves: MoneyMove[] = year?.moneyMoves as MoneyMove[] ?? []

  return {
    moneyMoves: moneyMoves.filter(m => !m.isInternalMove),
    isLoading,
  }
}
