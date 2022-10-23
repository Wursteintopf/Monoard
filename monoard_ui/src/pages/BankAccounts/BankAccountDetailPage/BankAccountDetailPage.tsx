import React, { useEffect } from 'react'
import ContentWithSidebar from '../../../design/layouts/ContentWithSidebar'
import BankAccountDetailPageHeader from './components/BankAccountDetailPageHeader'
import MonthInputSidebar from '../../../components/MonthInputSidebar/MonthInputSidebar'
import MoneyMoveList from '../../../components/BudgetPlanMatrix/MoneyMoveList/MoneyMoveList'
import { useMoneyMovesByBankAccount } from '../../../data/MoneyMoves/MoneyMovesHooks'
import BreadCrumbContext, { useBreadCrumbContext } from '../../../components/BreadCrumbContext/BreadCrumbContext'

const BankAccountPage: React.FC = () => {
  const { moneyMoves } = useMoneyMovesByBankAccount()
  const { setBreadCrumbs } = useBreadCrumbContext()

  useEffect(() => {
    setBreadCrumbs([])
  }, [])

  return (
    <>
      <MoneyMoveList moneyMoves={moneyMoves} />
    </>
  )
}

const BankAccountDetailPage: React.FC = () => {
  return (
    <>
      <BreadCrumbContext>
        <BankAccountDetailPageHeader />

        <ContentWithSidebar
          content={<BankAccountPage />}
          sidebar={MonthInputSidebar}
        />
      </BreadCrumbContext>
    </>
  )
}

export default BankAccountDetailPage
