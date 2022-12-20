import { budgetApi } from './BudgetReducer'
import { useActiveYear } from '../Year/hooks/useActiveYear'
import { Budget } from '@wursteintopf/monoard_data_models'

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
