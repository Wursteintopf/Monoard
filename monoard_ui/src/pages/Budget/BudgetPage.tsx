import React from 'react'
import { BudgetPlanMatrix } from '../../components/BudgetPlanMatrix/BudgetPlanMatrix'
import PageHeader from '../../components/PageHeader/PageHeader'

const BudgetPage: React.FC = () => {
  return (
    <>
      <PageHeader title='Budgetplanung' />

      <BudgetPlanMatrix />
    </>
  )
}

export default BudgetPage
