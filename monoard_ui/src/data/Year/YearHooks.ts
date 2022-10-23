import { useEffect } from 'react'
import { rootLens } from './../RootLens'
import { yearApi } from './YearReducer'
import { Month, monthArray, monthAtIndex, MonthIndices } from '../../data_types/Month'
import { MoneyMove } from '../../data_types/MoneyMove'
import { Budget } from '../../data_types/Budget'
import { Expense, Income, MoneyMoveWithBudget, MonthBudget, MonthData, MonthIncomeBudget, YearByMonths } from './YearTypes'

const assignBudgets = (moneyMoves: MoneyMove[], budgets: Budget[]): MoneyMoveWithBudget[] => 
  moneyMoves.map(moneyMove => {
    if (moneyMove.budget) {
      return {
        ...moneyMove,
        budget: (moneyMove.budget as Budget),
      } 
    }

    const budget = budgets.find(budget => budget.keywords
      .split(',')
      .filter(k => k !== '')
      .some(keyword => (moneyMove.purpose.includes(keyword) || moneyMove.foreignBankAccount.includes(keyword))))
    
    return {
      ...moneyMove,
      budget,
    }
  })

const calculateSum = (array: Array<Expense | Income | MonthBudget | MonthIncomeBudget>) => array.reduce((sum, el) => (sum += el.amount), 0)

export const useActiveYear = (): YearByMonths => {
  const [fetch] = yearApi.endpoints.readActive.useLazyQuery()

  useEffect(() => {
    fetch()
  }, [])

  const activeYear = rootLens.year.activeYear.select()

  const moneyMoves = assignBudgets(activeYear.moneyMoves, activeYear.budgets)

  const months = monthArray.reduce((monthObj, month, index) => { 
    const monthMoneyMoves = moneyMoves.filter(m => m.month === month)
    const expenses = monthMoneyMoves.filter(m => m.amount > 0)
    const incomes = monthMoneyMoves.filter(m => m.amount < 0)

    const prepareBudgets = (budgets: Budget[], budgetOrIncome: 'budgets' | 'incomeBudgets'): MonthBudget[] => budgets
      .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
      .map(b => {
        const moves = monthMoneyMoves.filter(m => (m.budget && m.budget.id === b.id))
        const prevMonthBudget = index > 0 ? monthObj[monthAtIndex[index - 1 as MonthIndices]][budgetOrIncome].find(search => search.slug === b.slug) as MonthBudget : { base: 0, amount: 0, spent: 0 }

        return {
          name: b.name,
          slug: b.slug,
          base: index === 0 ? b.base : (prevMonthBudget.base + prevMonthBudget.amount - prevMonthBudget.spent),
          amount: b[month],
          spent: -calculateSum(moves),
        }
      })

    const budgets = prepareBudgets(activeYear.budgets.filter(b => !b.isIncome), 'budgets')
    const incomeBudgets = prepareBudgets(activeYear.budgets.filter(b => b.isIncome), 'incomeBudgets')

    return {
      ...monthObj,
      [month]: {
        expenses,
        incomes,
        sumExpenses: calculateSum(expenses),
        sumIncomes: calculateSum(incomes),
        budgets,
        incomeBudgets,
        sumBudgetsAdded: calculateSum(budgets),
        sumIncomeBudgetsAdded: calculateSum(incomeBudgets),
      },
    }
  }, {} as Record<Month, MonthData>)

  return {
    id: activeYear.id as number,
    year: activeYear.year,
    budgets: activeYear.budgets.filter(b => !b.isIncome),
    incomeBudgets: activeYear.budgets.filter(b => b.isIncome),
    months,
  }
}
