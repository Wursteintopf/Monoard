import React from 'react'
import BudgetList from '../../components/BudgetList/BudgetList'
import BudgetMonthList from '../../components/BudgetMonthList/BudgetMonthList'
import MoneyMoveList from '../../components/BudgetPlanMatrix/MoneyMoveList/MoneyMoveList'
import PageHeader from '../../components/PageHeader/PageHeader'
import { useMoneyMoves } from '../../data/MoneyMoves/MoneyMovesHooks'
import Box from '../../design/components/LayoutElements/Box'
import { Headline } from '../../design/components/Typography/Typography'
import { rootLens } from '../../data/RootLens'
import { Month, monthArray, monthsReadableGerman } from '../../data_types/Month'
import { useActiveYear } from '../../data/Year/YearHooks'

const MonthOverview: React.FC = () => {
  return (
    <>
      <Box mb='l'>
        <BudgetMonthList incomeOrBudgets='incomeBudgets' />
      </Box>

      <Box mb='l'>
        <BudgetMonthList incomeOrBudgets='budgets' />
      </Box>
    </>
  )
}

const MonthOverviewPage: React.FC = () => {
  const { moneyMoves } = useMoneyMoves()
  const selectedMonth = rootLens.ui.selectedMonth
  const activeYear = useActiveYear()
  const month = activeYear.months[selectedMonth.select()]
  const moves = month.expenses
  
  const monthSelection = {
    value: selectedMonth.select(),
    onChange: (value: Month) => selectedMonth.set(value),
    options: monthArray.map(m => ({ value: m, label: monthsReadableGerman[m] })),
  }

  return (
    <>
      <PageHeader title={`Monatsübersicht - ${monthsReadableGerman[selectedMonth.select()]}`} mainSelects={[monthSelection]} />
      <MonthOverview />

      <Box>
        <Headline>Kontobewegungen</Headline>
        <MoneyMoveList moneyMoves={moves} hideColumns={['iban']} />
      </Box>
    </>
  )
}

export default MonthOverviewPage
