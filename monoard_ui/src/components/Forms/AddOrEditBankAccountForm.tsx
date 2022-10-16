import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBankAccounts } from '../../data/BankAccounts/BankAccountHooks'
import { bankAccountApi } from '../../data/BankAccounts/BankAccountReducer'
import { defaultAddBankAccountForm } from '../../data/Forms/FormTypes'
import { rootLens } from '../../data/RootLens'
import { BankAccount } from '../../data_types/BankAccount'
import ConditionalElement from '../../design/components/ConditionalElement/ConditionalElement'
import Form, { FormComponentProps } from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import FormCheckboxInput from '../../design/components/FormElements/FormCheckboxInput'
import FormNumberInput from '../../design/components/FormElements/FormNumberInput'
import FormSelectInput from '../../design/components/FormElements/FormSelectInput'
import FormTextInput from '../../design/components/FormElements/FormTextInput'
import LoadingIndicator from '../../design/components/LoadingIndicator/LoadingIndicator'

interface AddOrEditBankAccountFormProps extends FormComponentProps {
  forwardToDetailPage?: boolean
  editMode?: boolean
  slug?: string
}

const AddOrEditBankAccountForm: React.FC<AddOrEditBankAccountFormProps> = ({
  additionalSubmitAction,
  editMode,
  slug,
  forwardToDetailPage,
}) => {
  const navigate = useNavigate()

  const addBankAccountForm = rootLens.form.addBankAccountForm

  const [addBankAccountMutation] = bankAccountApi.endpoints.createOwn.useMutation()
  const [editBankAccountMutation] = bankAccountApi.endpoints.updateOwn.useMutation()
  const [loadBankAccount] = bankAccountApi.endpoints.readOneByOwn.useLazyQuery()
  const [reloadBankAccounts] = bankAccountApi.endpoints.readAllOwn.useLazyQuery()
  const { data, isLoading } = bankAccountApi.endpoints.usedSlugs.useQuery()

  const { bankAccounts } = useBankAccounts()

  const bankAccountOptions = useMemo(() => bankAccounts ? bankAccounts.map(b => ({ label: b.name, value: b.id })) : [], [bankAccounts])

  const isPayPalType = addBankAccountForm.paypalType.select()
  const isDirty = addBankAccountForm.isDirty.select()
  const name = addBankAccountForm.name.select()
  const iban = addBankAccountForm.iban.select()
  const connectedBankAccount = addBankAccountForm.connectedBankAccount.select()

  const canBeSubmitted = isDirty && name !== '' && iban !== '' && (!isPayPalType || connectedBankAccount !== -1)

  useEffect(() => {
    if (editMode) {
      loadBankAccount({ slug })
        .then(result => {
          if (result.data) {
            const cBA = result.data.connectedBankAccount
            addBankAccountForm.set({
              ...result.data,
              isDirty: false,
              connectedBankAccount: (cBA && (typeof cBA === 'number' ? cBA : cBA.id)) || -1,
            }) 
          }
        })
    }
  }, [editMode, slug])

  const submit = async () => {
    try {
      const account: BankAccount = { ...addBankAccountForm.get() }
      account.connectedBankAccount = account.connectedBankAccount === -1 ? undefined : account.connectedBankAccount

      if (editMode) {
        await editBankAccountMutation(account).unwrap()
      } else {
        await addBankAccountMutation(account).unwrap()
      }

      reloadBankAccounts()

      addBankAccountForm.set(defaultAddBankAccountForm)

      if (forwardToDetailPage) navigate(`/bankaccount/detail/${account.slug}`)
    } catch (e) {
      // TODO: Add better error handling
      console.log(e)
    }

    if (additionalSubmitAction) additionalSubmitAction()
  }

  const getSlugNumber = useMemo(() => {
    return (slug: string, initial: number): number => {
      return data?.includes(slug + '_' + initial)
        ? getSlugNumber(slug, initial + 1)
        : initial
    }
  }, [])

  const slugSideEffect = useMemo(() => {
    return (value: string) => {
      let snakeCase = value
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z][a-z])/)
        .map((word) => word.toLowerCase())
        .join('_')

      if (data?.includes(snakeCase)) {
        snakeCase += '_' + getSlugNumber(snakeCase, 1)
      }

      addBankAccountForm.slug.set(snakeCase)
    }
  }, [data])

  if (isLoading) return <LoadingIndicator />

  return (
    <Form>
      <FormCheckboxInput lens={addBankAccountForm.paypalType} label='Paypal Konto' />
      <FormTextInput
        lens={addBankAccountForm.name}
        label='Name'
        onChangeSideEffect={slugSideEffect}
        setDirty={addBankAccountForm.isDirty}
      />
      <FormTextInput lens={addBankAccountForm.slug} disabled label='Slug' />
      <FormTextInput lens={addBankAccountForm.iban} label={isPayPalType ? 'PayPal Email' : 'IBAN'} setDirty={addBankAccountForm.isDirty} />
      <ConditionalElement condition={addBankAccountForm.paypalType}>
        <FormSelectInput options={bankAccountOptions} lens={addBankAccountForm.connectedBankAccount} />
      </ConditionalElement>
      <FormNumberInput
        lens={addBankAccountForm.balance}
        label='Kontostand'
      />
      <FormButton onClick={submit} label='Konto hinzufügen' disabled={!canBeSubmitted} />
    </Form>
  )
}

export default AddOrEditBankAccountForm
