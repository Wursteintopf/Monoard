import React, { useEffect } from 'react'
import BankAccountDetailPageHeader from './components/BankAccountDetailPageHeader'
import MoneyMoveList from '../../../components/MoneyMoveList/MoneyMoveList'
import BreadCrumbContext, { useBreadCrumbContext } from '../../../components/BreadCrumbContext/BreadCrumbContext'
import { useParams } from 'react-router-dom'
import { useMoneyMovesByBankAccount } from '../../../data/Year/YearHooks'
import { rootLens } from '../../../data/RootLens'

const BankAccountPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const currentMonth = rootLens.ui.selectedMonth.select()
  const moneyMoves = useMoneyMovesByBankAccount(slug ?? '', currentMonth)

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
        <BankAccountPage />
      </BreadCrumbContext>
    </>
  )
}

export default BankAccountDetailPage
