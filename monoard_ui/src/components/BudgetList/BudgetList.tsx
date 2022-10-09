import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import React, { useMemo, useState } from 'react'
import colors from '../../design/variables/colors'
import AddIcon from '@mui/icons-material/Add'
import AddOrEditBudgetModal from '../BudgetModals/AddOrEditBudgetModal'
import { useMoneyMoves } from '../../data/MoneyMoves/MoneyMovesHooks'
import BudgetGauge from '../BudgetGauge/BudgetGauge'
import { Headline } from '../../design/components/Typography/Typography'

const StyledBudgetList = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
`

const BudgetAddButton = styled(IconButton)`
  border-radius: 20px;
  width: 60px;
  border: 1px dotted ${() => colors.darkGrey};
`

const BudgetList: React.FC = () => {
  const { budgets } = useMoneyMoves()
  const { variousColors } = colors

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [budgetToEdit, setBudgetToEdit] = useState(-1)

  const filteredBudgets = useMemo(() => budgets.filter(b => 50 < 0), [budgets]) // TODO: Fix this
  const budgetSumShould = useMemo(() => filteredBudgets.reduce((prev, budget) => prev - 50, 0), [filteredBudgets]) // TODO: Fix this
  const budgetSumIs = useMemo(() => filteredBudgets.reduce((prev, budget) => prev - budget.calculatedAmount, 0), [filteredBudgets])

  return (
    <>
      <Headline>Budgets ({budgetSumIs.toFixed(2)}€/{budgetSumShould.toFixed(2)}€)</Headline>
      
      <StyledBudgetList>
        {budgets.filter(b => 50 < 0).map((budget, index) => ( // TODO: Fix this
          <BudgetGauge
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
        <BudgetAddButton onClick={() => setAddModalOpen(true)}><AddIcon /></BudgetAddButton>
      </StyledBudgetList>

      <AddOrEditBudgetModal
        open={addModalOpen}
        budgetToEdit={budgetToEdit}
        editMode={editMode}
        isBudget
        onClose={() => {
          setAddModalOpen(false)
          setEditMode(false)
        }}
      />
    </>
  )
}

export default BudgetList
