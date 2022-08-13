import React, { ReactNode, useEffect } from 'react'
import { useMoneyMovesByBankAccount } from '../../data/MoneyMoves/MoneyMovesHooks'
import { rootLens } from '../../data/RootLens'
import Card from '../../design/components/Card/Card'
import FormCheckboxInput from '../../design/components/FormElements/FormCheckboxInput'
import FormMonthPicker from '../../design/components/FormElements/FormMonthPicker'
import Box from '../../design/components/LayoutElements/Box'

const Sidebar: React.FC = () => {
  const sidebarForm = rootLens.form.sidebarForm
  const value = sidebarForm.currentMonth.select()
  const { refetchCurrentMoneyMoves, refetchCurrentBudgets } = useMoneyMovesByBankAccount()

  useEffect(() => {
    sidebarForm.currentMonth.set(new Date())
    sidebarForm.hideInternal.set(true)
  }, [])

  useEffect(() => {
    refetchCurrentMoneyMoves()
    refetchCurrentBudgets()
  }, [value])

  return (
    <Card variant='outlined' width='100%' ph='m' pv='m'>
      <FormMonthPicker
        lens={sidebarForm.currentMonth}
        label='Monat'
        variant='standard'
      />
      <Box mt='m'>
        <FormCheckboxInput
          lens={sidebarForm.hideInternal}
          label='Interne ausblenden'
        />
      </Box>
    </Card>
  )
}

const MonthInputSidebar: ReactNode[] = [
  <Sidebar key='monthpicker' />,
]

export default MonthInputSidebar
