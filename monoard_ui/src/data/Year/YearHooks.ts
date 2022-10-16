import { useEffect } from 'react'
import { rootLens } from './../RootLens'
import { yearApi } from './YearReducer'

export const useActiveYear = () => {
  const [fetch] = yearApi.endpoints.readActive.useLazyQuery()

  useEffect(() => {
    fetch()
  }, [])

  const activeYear = rootLens.year.activeYear.select()

  return {
    ...activeYear,
    budgets: activeYear.budgets.filter(b => !b.isIncome).sort((a, b) => (a.id ?? 0) - (b.id ?? 0)),
    expectedIncomes: activeYear.budgets.filter(b => b.isIncome).sort((a, b) => (a.id ?? 0) - (b.id ?? 0)),
  }
}
