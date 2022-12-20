import React from 'react'
import BudgetMonthList from '../../components/BudgetMonthList/BudgetMonthList'
import PageHeader from '../../components/PageHeader/PageHeader'
import Box from '../../design/components/LayoutElements/Box'
import { MoneyMoveMonthList } from '../../components/MoneyMoveMonthList/MoneyMoveMonthList'
import { useSelectedMonth } from '../../data/Ui/UiHooks'
import { Month, monthArray, monthsReadableGerman } from '@wursteintopf/monoard_data_models'

const MonthOverviewPage: React.FC = () => {
  const selectedMonth = useSelectedMonth()
  
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
