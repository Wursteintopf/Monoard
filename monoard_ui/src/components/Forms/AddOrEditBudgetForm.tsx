import React, { useCallback, useEffect } from 'react'
import { useSaveBudget } from '../../data/Budgets/BudgetHooks'
import { defaultAddBudgetForm } from '../../data/Forms/FormTypes'
import { rootLens } from '../../data/RootLens'
import { Budget } from '../../data_types/Budget'
import {
  Month,
  monthArray,
  monthsReadableGerman,
} from '../../data_types/Month'
import Form, {
  FormComponentProps,
} from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import FormKeywords from '../../design/components/FormElements/FormKeywords'
import FormNumberInput from '../../design/components/FormElements/FormNumberInput'
import FormTextInput from '../../design/components/FormElements/FormTextInput'
import {
  HorizontalDivider,
  HorizontalDividerWrapper,
} from '../../design/components/HorizontalDivider/HorizontalDivider'
import { CopyDownIcon } from '../../design/icons/CopyDownIcon'
import { IconButton, Tooltip } from '@mui/material'
import Flex from '../../design/components/LayoutElements/Flex'
import Box from '../../design/components/LayoutElements/Box'
import { budgetApi } from '../../data/Budgets/BudgetReducer'
import LoadingIndicator from '../../design/components/LoadingIndicator/LoadingIndicator'
import { slugSideEffect } from '../../utils/slugSideEffectUtil'

interface AddOrEditBankAccountFormProps extends FormComponentProps {
  budgetToEdit?: Budget
  isIncome?: boolean
}

const AddOrEditBudgetForm: React.FC<AddOrEditBankAccountFormProps> = ({
  additionalSubmitAction,
  budgetToEdit,
  isIncome,
}) => {
  const addBudgetForm = rootLens.form.addBudgetForm
  const isDirty = addBudgetForm.isDirty.select()
  const saveBudget = useSaveBudget()
  const { data, isLoading } = budgetApi.endpoints.usedSlugs.useQuery()

  const slugSideEffectCallback = useCallback((value: string) => {
    const snakeCase = data ? slugSideEffect(value, data) : ''
    addBudgetForm.slug.set(snakeCase)
  }, [data])

  useEffect(() => {
    if (budgetToEdit) {
      addBudgetForm.set({
        ...budgetToEdit,
        isDirty: false,
      })
    } else {
      addBudgetForm.set({
        ...defaultAddBudgetForm,
        isIncome: !!isIncome,
      })
    }
  }, [budgetToEdit, isIncome])

  const submit = () => {
    saveBudget({ ...addBudgetForm.get() }, !!budgetToEdit)
    if (additionalSubmitAction) additionalSubmitAction()
  }

  const copyToFollowing = (copy: Month) => {
    let copyAmount = 0
    let copied = false
    monthArray.forEach(month => {
      if (copied) {
        addBudgetForm[month].set(copyAmount)
        addBudgetForm.isDirty.set(true)
      } else if (month === copy) {
        copyAmount = addBudgetForm[month].get()
        copied = true
      }
    })
  }

  const renderMonthInput = (month: Month) => (
    <Flex alignItems='center'>
      <Box width='90%'>
        <FormNumberInput
          key={month}
          size='small'
          unit='€'
          setDirty={addBudgetForm.isDirty}
          lens={addBudgetForm[month]}
          label={monthsReadableGerman[month]}
        />
      </Box>
      <Box width='10%' ml='s'>
        <Tooltip title='In folgende kopieren'>
          <IconButton size='small' onClick={() => copyToFollowing(month)}>
            <CopyDownIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
      </Box>
    </Flex>
  )

  if (isLoading) return <LoadingIndicator />

  return (
    <Form>
      <HorizontalDividerWrapper>
        <HorizontalDivider>
          <FormTextInput
            lens={addBudgetForm.name}
            label='Name'
            setDirty={addBudgetForm.isDirty}
            onChangeSideEffect={slugSideEffectCallback}
          />
          <FormTextInput lens={addBudgetForm.slug} disabled label='Slug' />
          <FormKeywords
            lens={addBudgetForm.keywords}
            header='Filtern nach:'
            label='Neuer Filter'
            setDirty={addBudgetForm.isDirty}
          />
          {!isIncome && (
            <FormNumberInput
              lens={addBudgetForm.base}
              label='Basis'
              min={0}
              valueModifier={(value) => (!isIncome ? -value : value)}
              setDirty={addBudgetForm.isDirty}
            />
          )}
        </HorizontalDivider>
        <HorizontalDivider>
          {monthArray.slice(0, 6).map((month) => renderMonthInput(month))}
        </HorizontalDivider>
        <HorizontalDivider>
          {monthArray.slice(6, 12).map((month) => renderMonthInput(month))}
        </HorizontalDivider>
      </HorizontalDividerWrapper>

      <FormButton disabled={!isDirty} onClick={submit} label='Speichern' />
    </Form>
  )
}

export default AddOrEditBudgetForm
