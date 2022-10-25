import { Dialog, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { moneyMoveApi } from '../../data/MoneyMoves/MoneyMovesReducer'
import { rootLens } from '../../data/RootLens'
import { MoneyMoveWithSubs } from '../../data/Year/YearTypes'
import { MoneyMove } from '../../data_types/MoneyMove'
import Form from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import { ModalProps } from '../../types/ModalProps'

interface EditMoneyMoveModalProps extends ModalProps {
  move: MoneyMoveWithSubs
}

const EditMoneyMoveModal: React.FC<EditMoneyMoveModalProps> = ({ open, onClose, move }) => {
  const budgets = rootLens.year.activeYear.budgets.select()

  const budgetOptions = useMemo(() => {
    return budgets.map(b => ({
      label: b.name,
      value: b.id!,
    }))
  }, [budgets])

  const [selectedBudget, setSelectedBudget] = useState<number>(0)

  const [editMoneyMoveMutation] = moneyMoveApi.endpoints.updateOwn.useMutation()

  const handleBudgetSave = () => {
    const moveWithBudget: MoneyMove = { ...move, budget: selectedBudget }
    editMoneyMoveMutation(moveWithBudget)
    onClose()
  }

  useEffect(() => {
    if (budgetOptions[0]) setSelectedBudget(budgetOptions[0].value)
  }, [budgetOptions])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Budget manuell bearbeiten</DialogTitle>
      <DialogContent>
        <Form>
          <Select
            value={selectedBudget}
            onChange={event => setSelectedBudget(+event.target.value)}
          >
            {budgetOptions.map(b => (
              <MenuItem key={b.value} value={b.value}>{b.label}</MenuItem>
            ))}
          </Select>
          <FormButton onClick={handleBudgetSave} label='Speichern' />
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditMoneyMoveModal
