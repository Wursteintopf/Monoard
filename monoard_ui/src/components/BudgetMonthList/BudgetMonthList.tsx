import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import colors from '../../design/variables/colors'
import AddIcon from '@mui/icons-material/Add'
import { Headline } from '../../design/components/Typography/Typography'
import MoneyBar from '../MoneyBar/MoneyBar'
import { max } from 'd3-array'
import AddOrEditBudgetModal from '../BudgetModals/AddOrEditBudgetModal'
import { FilterBar } from '../FilterBar/FilterBar'
import { useSavedState } from '../../hooks/useSavedState'
import { useSelectedMonth } from '../../data/Ui/UiHooks'
import { useActiveYear } from '../../data/Year/hooks/useActiveYear'
import { useGetBudgetById } from '../../data/Year/hooks/useGetBudgetById'
import { Budget } from '@wursteintopf/monoard_data_models'

const StyledIncomeList = styled.div`
  margin-top: 20px;
`

const IncomeAddButton = styled(IconButton)`
  border-radius: 20px;
  width: 60px;
  border: 1px dotted ${() => colors.darkGrey};
`

type Filter = 'emptyHidden' | 'onlySummary'

const filterOptions: Record<Filter, string> = {
  emptyHidden: 'Leere verbergen',
  onlySummary: 'Nur Zusammenfassung anzeigen',
} // TODO: In the future this should be replaced with proper localization

interface BudgetMonthListProps {
  incomeOrBudgets: 'budgets' | 'incomeBudgets'
}

const BudgetMonthList: React.FC<BudgetMonthListProps> = ({ incomeOrBudgets }) => {
  const activeYear = useActiveYear()
  const getBudgetById = useGetBudgetById()
  const selectedMonth = useSelectedMonth().select()
  const month = activeYear.months[selectedMonth]

  const [filterList, setFilterList] = useSavedState<Filter[]>(['emptyHidden'], `filter_${incomeOrBudgets}`)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [budgetToEdit, setBudgetToEdit] = useState<Budget>()

  const budgets = month[incomeOrBudgets]
    .filter(i => filterList.includes('emptyHidden') ? (i.base + i.amount !== 0 || i.spent !== 0) : true)
    .sort((a, b) => (b.base + b.amount) - (a.base + a.amount))

  const { variousColors } = colors

  const maxAmount = incomeOrBudgets === 'incomeBudgets'
    ? (month.sumIncomeBudgetsAdded > month.sumIncomes ? month.sumIncomeBudgetsAdded : month.sumIncomes)
    : max(budgets.map(b => b.base + b.amount)) ?? 0

  return (
    <>
      <Headline>{incomeOrBudgets === 'incomeBudgets' ? 'Einkommen' : 'Budgets'}</Headline>

      <FilterBar<Filter> filterList={filterList} setFilterList={setFilterList} options={filterOptions} />
      
      <StyledIncomeList>
        {incomeOrBudgets === 'incomeBudgets' && (
          <MoneyBar
            label='Summe Einnahmen'
            max={month.sumIncomeBudgetsAdded > month.sumIncomes ? month.sumIncomeBudgetsAdded : month.sumIncomes}
            thisMax={month.sumIncomeBudgetsAdded}
            amount={month.sumIncomes}
            color={variousColors[0]}
          />
        )}
        
        {!filterList.includes('onlySummary') && budgets.map((incomeBudget, index) => (
          <MoneyBar
            key={index}
            label={incomeBudget.name}
            max={maxAmount}
            thisMax={incomeBudget.base + incomeBudget.amount}
            amount={incomeBudget.spent}
            color={variousColors[index + 1]}
            onClick={() => {
              setBudgetToEdit(getBudgetById(incomeBudget.id))
              setAddModalOpen(true)
            }}
          />
        ))}
        <IncomeAddButton
          onClick={() => {
            setAddModalOpen(true)
            setBudgetToEdit(undefined)
          }}
        >
          <AddIcon />
        </IncomeAddButton>
      </StyledIncomeList>

      <AddOrEditBudgetModal
        open={addModalOpen}
        budgetToEdit={budgetToEdit}
        isIncome={incomeOrBudgets === 'incomeBudgets'}
        onClose={() => {
          setAddModalOpen(false)
        }}
      />
    </>
  )
}

export default BudgetMonthList
