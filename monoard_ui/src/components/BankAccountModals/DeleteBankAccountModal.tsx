import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { ModalProps } from '../../types/ModalProps'
import DeleteBankAccountForm from '../Forms/DeleteBankAccountForm'

interface DeleteBankAccountModalProps extends ModalProps {
  forwardToListPage?: boolean
  id: number
}

const DeleteBankAccountModal: React.FC<DeleteBankAccountModalProps> = ({
  forwardToListPage,
  open,
  onClose,
  id,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Konto löschen</DialogTitle>
      <DialogContent>
        <DeleteBankAccountForm id={id} additionalSubmitAction={onClose} forwardToListPage={forwardToListPage} />
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBankAccountModal
