import React from 'react'
import PageHeader from '../../../components/PageHeader/PageHeader'
import BankAccountList from '../../../components/BankAccountList/BankAccountList'

const BankAccountListPage: React.FC = () => {
  return (
    <>
      <PageHeader title='Konten' />

      <BankAccountList />
    </>
  )
}

export default BankAccountListPage
