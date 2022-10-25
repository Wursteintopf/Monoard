import { budgetApi } from './BudgetReducer'
import { Budget } from '../../data_types/Budget'
import { useActiveYear } from '../Year/YearHooks'

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
