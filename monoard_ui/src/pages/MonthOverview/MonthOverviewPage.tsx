import React from 'react'
import BudgetMonthList from '../../components/BudgetMonthList/BudgetMonthList'
import PageHeader from '../../components/PageHeader/PageHeader'
import Box from '../../design/components/LayoutElements/Box'
import { rootLens } from '../../data/RootLens'
import { Month, monthArray, monthsReadableGerman } from '../../data_types/Month'
import { MoneyMoveMonthList } from '../../components/MoneyMoveMonthList/MoneyMoveMonthList'

const MonthOverviewPage: React.FC = () => {
  const selectedMonth = rootLens.ui.selectedMonth
  
  const monthSelection = {
    value: selectedMonth.select(),
    onChange: (value: Month) => selectedMonth.set(value),
    options: monthArray.map(m => ({ value: m, label: monthsReadableGerman[m] })),
  }

  return (
    <>
      <PageHeader title={`Monatsübersicht - ${monthsReadableGerman[selectedMonth.select()]}`} mainSelects={[monthSelection]} />

      <Box mb='l'>
        <BudgetMonthList incomeOrBudgets='incomeBudgets' />
      </Box>

      <Box mb='l'>
        <BudgetMonthList incomeOrBudgets='budgets' />
      </Box>

      <Box>
        <MoneyMoveMonthList />
      </Box>
    </>
  )
}

export default MonthOverviewPage
