import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { bankAccountApi } from '../../data/BankAccounts/BankAccountReducer'
import colors from '../../design/variables/colors'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import LoadingIndicator from '../../design/components/LoadingIndicator/LoadingIndicator'
import AddOrEditBankAccountModal from '../BankAccountModals/AddOrEditBankAccountModal'

const StyledBankAccountList = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
`

const BankAccountCard = styled.div<{ backgroundColor: string }>`
  width: 300px;
  background-color: ${props => props.backgroundColor};
  padding: 20px 30px;
  border-radius: 20px;
  color: white;
  position: relative;
`

const BankAccountName = styled.div`
  font-size: 1.3em;
  font-weight: 600;
`

const BankAccountBalance = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 15px;
  font-size: 2em;
`

const BankAccountAddButton = styled(IconButton)`
  border-radius: 20px;
  width: 60px;
  border: 1px dotted ${() => colors.darkGrey};
`

const BankAccountList: React.FC = () => {
  const { data, isLoading } = bankAccountApi.endpoints.readAllOwn.useQuery()
  const { variousColors } = colors

  const [addModalOpen, setAddModalOpen] = useState(false)

  if (isLoading || !data) return <LoadingIndicator />

  return (
    <>
      <StyledBankAccountList>
        {data.map((account, index) => (
          <Link key={account.slug} to={'/bankaccount/detail/' + account.slug}>
            <BankAccountCard backgroundColor={variousColors[index]}>
              <BankAccountName>{account.name}</BankAccountName>
              <BankAccountBalance>{account.balance} €</BankAccountBalance>
            </BankAccountCard>
          </Link>
        ))}
        <BankAccountAddButton onClick={() => setAddModalOpen(true)}>
          <AddIcon />
        </BankAccountAddButton>
      </StyledBankAccountList>

      <AddOrEditBankAccountModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </>
  )
}

export default BankAccountList
