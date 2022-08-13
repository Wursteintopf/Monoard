import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { ModalProps } from '../../types/ModalProps'
import AddOrEditBudgetForm from '../Forms/AddOrEditBudgetForm'

interface AddOrEditBudgetModalProps extends ModalProps {
  editMode?: boolean
  budgetToEdit: number
  isBudget?: boolean
}

const AddOrEditBudgetModal: React.FC<AddOrEditBudgetModalProps> = ({
  open,
  onClose,
  editMode,
  budgetToEdit,
  isBudget,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Budget hinzufügen</DialogTitle>
      <DialogContent>
        <AddOrEditBudgetForm additionalSubmitAction={onClose} editMode={editMode} budgetToEdit={budgetToEdit} isBudget={isBudget} />
      </DialogContent>
    </Dialog>
  )
}

export default AddOrEditBudgetModal
