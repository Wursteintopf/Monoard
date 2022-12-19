import React, { useEffect } from 'react'
import BankAccountDetailPageHeader from './components/BankAccountDetailPageHeader'
import MoneyMoveList from '../../../components/MoneyMoveList/MoneyMoveList'
import BreadCrumbContext, { useBreadCrumbContext } from '../../../components/BreadCrumbContext/BreadCrumbContext'
import { useParams } from 'react-router-dom'
import { useSelectedMonth } from '../../../data/Ui/UiHooks'
import { useMoneyMovesByBankAccount } from '../../../data/Year/hooks/useMoneyMovesByBankAccount'

const BankAccountPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const currentMonth = useSelectedMonth().select()
  const moneyMoves = useMoneyMovesByBankAccount(slug ?? '', currentMonth)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
