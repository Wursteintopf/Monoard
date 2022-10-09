import React, { useEffect } from 'react'
import { useCurrentBankAccount } from '../../data/BankAccounts/BankAccountHooks'
import { budgetApi } from '../../data/Budgets/BudgetReducer'
import { defaultAddBudgetForm } from '../../data/Forms/FormTypes'
import { useMoneyMovesByBankAccount } from '../../data/MoneyMoves/MoneyMovesHooks'
import { rootLens } from '../../data/RootLens'
import Form, { FormComponentProps } from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import FormKeywords from '../../design/components/FormElements/FormKeywords'
import FormNumberInput from '../../design/components/FormElements/FormNumberInput'
import FormTextInput from '../../design/components/FormElements/FormTextInput'

interface AddOrEditBankAccountFormProps extends FormComponentProps {
  editMode?: boolean
  budgetToEdit: number
  isBudget?: boolean
}

const AddOrEditBudgetForm: React.FC<AddOrEditBankAccountFormProps> = ({
  additionalSubmitAction,
  editMode,
  budgetToEdit,
  isBudget,
}) => {
  const addBudgetForm = rootLens.form.addBudgetForm

  const { bankAccount } = useCurrentBankAccount()
  const { refetchCurrentBudgets } = useMoneyMovesByBankAccount()

  const [addBudgetMutation] = budgetApi.endpoints.addOwn.useMutation()
  const [editBudgetMutation] = budgetApi.endpoints.editOwn.useMutation()
  const [loadBudget] = budgetApi.endpoints.readOwn.useLazyQuery()

  useEffect(() => {
    if (editMode) {
      loadBudget(budgetToEdit)
        .then(result => {
          if (result.data) {
            addBudgetForm.set({
              ...result.data,
              isDirty: false,
            }) 
          }
        })
    } else {
      addBudgetForm.set(defaultAddBudgetForm)
    }
  }, [editMode, budgetToEdit])

  const submit = async () => {
    try {
      const budget = { ...addBudgetForm.get(), bankAccount }

      if (editMode) {
        await editBudgetMutation(budget).unwrap()
      } else {
        await addBudgetMutation(budget).unwrap()
      }

      refetchCurrentBudgets()
    } catch (e) {
      console.log(e)
    }

    if (additionalSubmitAction) additionalSubmitAction()
  }

  return (
    <Form>
      <FormTextInput lens={addBudgetForm.name} label='Name' />
      <FormKeywords lens={addBudgetForm.keywords} header='Filtern nach:' label='Neuer Filter' />
      <FormNumberInput lens={addBudgetForm.amount} label='Betrag' min={0} valueModifier={(value) => isBudget ? -value : value} />
      <FormButton onClick={submit} label='Speichern' />
    </Form>
  )
}

export default AddOrEditBudgetForm
