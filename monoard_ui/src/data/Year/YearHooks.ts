import { useEffect } from 'react'
import { rootLens } from './../RootLens'
import { yearApi } from './YearReducer'
import { Month, monthArray } from '../../data_types/Month'

export const useActiveYear = () => {
  const [fetch] = yearApi.endpoints.readActive.useLazyQuery()

  useEffect(() => {
    fetch()
  }, [])

  const activeYear = rootLens.year.activeYear.select()

  const budgets = activeYear.budgets.filter((b) => !b.isIncome).sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
  const expectedIncomes = activeYear.budgets.filter((b) => b.isIncome).sort((a, b) => (a.id ?? 0) - (b.id ?? 0))

  const sumBudgets = monthArray.reduce((sums, month) => ({
    ...sums,
    [month]: budgets.reduce((sum, budget) => (sum += budget[month]), 0),
  }), {} as Record<Month, number>)

  const sumIncomes = monthArray.reduce((sums, month) => ({
    ...sums,
    [month]: expectedIncomes.reduce((sum, income) => (sum += income[month]), 0),
  }), {} as Record<Month, number>)

  const sumDifference = monthArray.reduce((sums, month) => ({
    ...sums,
    [month]: sumIncomes[month] - sumBudgets[month],
  }), {} as Record<Month, number>)

  return {
    ...activeYear,
    budgets,
    expectedIncomes,
    sumBudgets,
    sumIncomes,
    sumDifference,
  }
}
