import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Budget } from '@wursteintopf/monoard_data_models'
import React from 'react'
import { ModalProps } from '../../types/ModalProps'
import AddOrEditBudgetForm from '../Forms/AddOrEditBudgetForm'

interface AddOrEditBudgetModalProps extends ModalProps {
  budgetToEdit?: Budget
  isIncome?: boolean
}

const AddOrEditBudgetModal: React.FC<AddOrEditBudgetModalProps> = ({
  open,
  onClose,
  budgetToEdit,
  isIncome,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>{isIncome ? 'Geplanten Eingang hinzufügen' : 'Budget hinzufügen'}</DialogTitle>
      <DialogContent>
        <AddOrEditBudgetForm additionalSubmitAction={onClose} budgetToEdit={budgetToEdit} isIncome={isIncome} />
      </DialogContent>
    </Dialog>
  )
}

export default AddOrEditBudgetModal
