import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import React, { useMemo, useState } from 'react'
import colors from '../../design/variables/colors'
import AddIcon from '@mui/icons-material/Add'
import AddOrEditBudgetModal from '../BudgetModals/AddOrEditBudgetModal'
import { useMoneyMoves } from '../../data/MoneyMoves/MoneyMovesHooks'
import { Headline } from '../../design/components/Typography/Typography'
import IncomeBar from '../IncomeBar/IncomeBar'

const StyledIconList = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
`

const IncomeAddButton = styled(IconButton)`
  border-radius: 20px;
  width: 60px;
  border: 1px dotted ${() => colors.darkGrey};
`

const IncomeMonthList: React.FC = () => {
  const { budgets } = useMoneyMoves()
  const { variousColors } = colors

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [budgetToEdit, setBudgetToEdit] = useState(-1)

  const incomes = useMemo(() => budgets.filter(b => 50 > 0), [budgets]) // TODO: Fix this
  const incomeSumShould = useMemo(() => incomes.reduce((prev, budget) => prev + 50, 0), [incomes]) // TODO: Fix this
  const incomeSumIs = useMemo(() => incomes.reduce((prev, budget) => prev + budget.calculatedAmount, 0), [incomes])

  return (
    <>
      <Headline>Einkommen ({incomeSumIs.toFixed(2)}€/{incomeSumShould.toFixed(2)}€)</Headline>
      
      <StyledIconList>
        {incomes.map((budget, index) => (
          <IncomeBar
            key={index}
            budget={budget}
            color={variousColors[index]}
            onClick={() => {
              setBudgetToEdit(budget.id as number)
              setEditMode(true)
              setAddModalOpen(true)
            }}
          />
        ))}
        <IncomeAddButton onClick={() => setAddModalOpen(true)}><AddIcon /></IncomeAddButton>
      </StyledIconList>
    </>
  )
}

export default IncomeMonthList
