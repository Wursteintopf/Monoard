import { budgetApi } from './BudgetReducer'
import { rootLens } from './../RootLens'

export const useBudgets = () => {
  const month = rootLens.form.sidebarForm.currentMonth.get()
  const { isFetching, isLoading, refetch } = budgetApi.endpoints.readInMonth.useQuery({ month })
  const data = rootLens.budget.currentBudgets.select()

  return {
    data,
    budgets: data,
    isFetching,
    isLoading,
    refetchCurrentBudgets: refetch,
  }
}
