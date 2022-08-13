import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { ModalProps } from '../../types/ModalProps'
import AddOrEditBankAccountForm from '../Forms/AddOrEditBankAccountForm'

interface AddOrEditBankAccountModalProps extends ModalProps {
  forwardToDetailPage?: boolean
  editMode?: boolean
  slug?: string
}

const AddOrEditBankAccountModal: React.FC<AddOrEditBankAccountModalProps> = ({
  open,
  onClose,
  editMode,
  slug,
  forwardToDetailPage,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Konto hinzufügen</DialogTitle>
      <DialogContent>
        <AddOrEditBankAccountForm
          editMode={editMode}
          slug={slug}
          additionalSubmitAction={onClose}
          forwardToDetailPage={forwardToDetailPage}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddOrEditBankAccountModal
