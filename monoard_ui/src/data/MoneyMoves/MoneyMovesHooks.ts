import { Budget } from './../../data_types/Budget'
import { budgetApi } from './../Budgets/BudgetReducer'
import { startOfMonth, endOfMonth } from './../../utils/dateUtils'
import { rootLens } from './../RootLens'
import { moneyMoveApi } from './MoneyMovesReducer'
import { useParams } from 'react-router-dom'
import { BudgetWithCalculatedAmount, MoneyMoveWithFoundBudget } from './MoneyMoveTypes'
import { useMemo } from 'react'
import { MoneyMove } from '../../data_types/MoneyMove'

interface MoneyMovesAndBudgets {
  moneyMoves: MoneyMoveWithFoundBudget[]
  budgets: BudgetWithCalculatedAmount[]
  isFetching: boolean
  isLoading: boolean
  refetchCurrentMoneyMoves: () => void
  refetchCurrentBudgets: () => void
}

const findBudget = (moneyMoves: MoneyMove[], budgets: Budget[]): MoneyMoveWithFoundBudget[] => {
  return moneyMoves.map(moneyMove => {
    let moneyMoveWithBudget = { ...moneyMove, foundBudget: '' }
    budgets.forEach(budget => {
      if (moneyMove.manualBudget) {
        moneyMoveWithBudget.foundBudget = (moneyMoveWithBudget.manualBudget as Budget).name
      } else if (
        budget.keywords
          .split(',').filter(k => k !== '')
          .some(keyword => (moneyMove.purpose.includes(keyword) || moneyMove.foreignBankAccount.includes(keyword)))
      ) {
        moneyMoveWithBudget = { ...moneyMove, foundBudget: budget.name }
      }
    })
    return moneyMoveWithBudget
  })
}

const calculateBudgetAmount = (moneyMoves: MoneyMoveWithFoundBudget[], budgets: Budget[]): BudgetWithCalculatedAmount[] => {
  return budgets.map(budget => ({
    ...budget,
    calculatedAmount: moneyMoves.filter(m => m.foundBudget === budget.name).reduce((prev, current) => prev + current.amount, 0),
  }))
}

export const useMoneyMovesByBankAccount = (): MoneyMovesAndBudgets => {
  const { slug } = useParams<{ slug: string }>()
  const from = startOfMonth(rootLens.form.sidebarForm.currentMonth.get())
  const to = endOfMonth(rootLens.form.sidebarForm.currentMonth.get())
  const month = rootLens.form.sidebarForm.currentMonth.get()
  const { isFetching: isFetchingMoneyMoves, isLoading: isLoadingMoneyMoves, refetch: refetchCurrentMoneyMoves } = moneyMoveApi.endpoints.readByBankAccountInRange.useQuery({ slug: slug as string, from, to })
  const { isFetching: isFetchingBudgets, isLoading: isLoadingBudgets, refetch: refetchCurrentBudgets } = budgetApi.endpoints.readInMonth.useQuery({ month })
  const moneyMoves = rootLens.moneyMove.moneyMovesByBankAccount.select()
  const budgets = rootLens.budget.currentBudgets.select()

  const moneyMovesWithFoundBudget = useMemo(() => findBudget(moneyMoves, budgets), [moneyMoves, budgets])

  const budgetsWithCalculatedAmount = useMemo(() => calculateBudgetAmount(moneyMovesWithFoundBudget, budgets), [moneyMovesWithFoundBudget])

  return {
    moneyMoves: moneyMovesWithFoundBudget,
    budgets: budgetsWithCalculatedAmount,
    isFetching: isFetchingMoneyMoves || isFetchingBudgets,
    isLoading: isLoadingMoneyMoves || isLoadingBudgets,
    refetchCurrentMoneyMoves,
    refetchCurrentBudgets,
  }
}

export const useMoneyMoves = (): MoneyMovesAndBudgets => {
  const from = startOfMonth(rootLens.form.sidebarForm.currentMonth.get())
  const to = endOfMonth(rootLens.form.sidebarForm.currentMonth.get())
  const month = rootLens.form.sidebarForm.currentMonth.get()
  const { isFetching: isFetchingMoneyMoves, isLoading: isLoadingMoneyMoves, refetch: refetchCurrentMoneyMoves } = moneyMoveApi.endpoints.readInRange.useQuery({ from, to })
  const { isFetching: isFetchingBudgets, isLoading: isLoadingBudgets, refetch: refetchCurrentBudgets } = budgetApi.endpoints.readInMonth.useQuery({ month })
  const moneyMoves = rootLens.moneyMove.moneyMovesByBankAccount.select()
  const budgets = rootLens.budget.currentBudgets.select()

  const moneyMovesWithFoundBudget = useMemo(() => findBudget(moneyMoves, budgets), [moneyMoves, budgets])

  const budgetsWithCalculatedAmount = useMemo(() => calculateBudgetAmount(moneyMovesWithFoundBudget, budgets), [moneyMovesWithFoundBudget])

  return {
    moneyMoves: moneyMovesWithFoundBudget,
    budgets: budgetsWithCalculatedAmount,
    isFetching: isFetchingMoneyMoves || isFetchingBudgets,
    isLoading: isLoadingMoneyMoves || isLoadingBudgets,
    refetchCurrentMoneyMoves,
    refetchCurrentBudgets,
  }
}
