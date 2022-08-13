import React from 'react'
import { useNavigate } from 'react-router-dom'
import { bankAccountApi } from '../../data/BankAccounts/BankAccountReducer'
import Form, { FormComponentProps } from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import FormText from '../../design/components/FormElements/FormText'

interface DeleteBankAccountFormProps extends FormComponentProps {
  forwardToListPage?: boolean
  id: number
}

const DeleteBankAccountForm: React.FC<DeleteBankAccountFormProps> = ({
  id,
  additionalSubmitAction,
  forwardToListPage,
}) => {
  const navigate = useNavigate()

  const [deleteBankAccountMutation] = bankAccountApi.endpoints.deleteOwn.useMutation()
  const [reloadBankAccounts] = bankAccountApi.endpoints.readAllOwn.useLazyQuery()

  const submit = async () => {
    try {
      await deleteBankAccountMutation(id).unwrap()

      reloadBankAccounts()

      if (forwardToListPage) navigate('/bankaccount')
    } catch (e) {
      // TODO: Add better error handling
      console.log(e)
    }

    if (additionalSubmitAction) additionalSubmitAction()
  }

  return (
    <Form>
      <FormText>Möchten Sie dieses Konto wirklich unwiederruflich löschen?</FormText>
      <FormButton onClick={submit} label='Konto löschen' />
    </Form>
  )
}

export default DeleteBankAccountForm
