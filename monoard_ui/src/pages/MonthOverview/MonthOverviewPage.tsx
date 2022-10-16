import React from 'react'
import BudgetList from '../../components/BudgetList/BudgetList'
import IncomeMonthList from '../../components/IncomeMonthList/IncomeMonthList'
import MoneyMoveList from '../../components/MoneyMoveList/MoneyMoveList'
import MonthInputSidebar from '../../components/MonthInputSidebar/MonthInputSidebar'
import PageHeader from '../../components/PageHeader/PageHeader'
import { useMoneyMoves } from '../../data/MoneyMoves/MoneyMovesHooks'
import Box from '../../design/components/LayoutElements/Box'
import { Headline } from '../../design/components/Typography/Typography'
import ContentWithSidebar from '../../design/layouts/ContentWithSidebar'

const MonthOverview: React.FC = () => {
  return (
    <>
      <Box mb='l'>
        <IncomeMonthList />
      </Box>

      <Box mb='l'>
        <BudgetList />
      </Box>
    </>
  )
}

const MonthOverviewPage: React.FC = () => {
  const { moneyMoves } = useMoneyMoves()
  
  return (
    <>
      <PageHeader title='Monatsübersicht' />
      <ContentWithSidebar content={<MonthOverview />} sidebar={MonthInputSidebar} />

      <Box>
        <Headline>Kontobewegungen</Headline>
        <MoneyMoveList moneyMoves={moneyMoves} hideColumns={['iban']} />
      </Box>
    </>
  )
}

export default MonthOverviewPage
