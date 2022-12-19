import { useCallback } from 'react'
import { rootLens } from '../../RootLens'
import { yearApi } from '../YearReducer'

export const useGetBudgetById = () => {
  yearApi.endpoints.readActive.useQuery()
  
  const budgets = rootLens.year.activeYear.budgets.select()
  
  return useCallback((id: number) => {
    return budgets.find(b => b.id === id)
  }, [budgets])
}
