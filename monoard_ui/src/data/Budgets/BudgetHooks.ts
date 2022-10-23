import { budgetApi } from './BudgetReducer'
import { rootLens } from './../RootLens'
import { Budget } from '../../data_types/Budget'
import { useActiveYear } from '../Year/YearHooks'

export const useBudgets = () => {
  const month = rootLens.form.monthSidebarForm.currentMonth.get()
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

export const useSaveBudget = () => {
  const [addBudgetMutation] = budgetApi.endpoints.createOwn.useMutation()
  const [editBudgetMutation] = budgetApi.endpoints.updateOwn.useMutation()
  const year = useActiveYear()

  return (budget: Budget, edit?: boolean) => {
    if (edit) editBudgetMutation({ ...budget, year: year.id })
    else addBudgetMutation({ ...budget, year: year.id })
  }
}

export const useDeleteBudget = () => {
  const [deleteBudgetMutation] = budgetApi.endpoints.deleteOwn.useMutation()
  return (id: number) => deleteBudgetMutation(id)
}
