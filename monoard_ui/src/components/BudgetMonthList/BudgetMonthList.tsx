import styled from '@emotion/styled'
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import React, { useState } from 'react'
import colors from '../../design/variables/colors'
import AddIcon from '@mui/icons-material/Add'
import { Headline } from '../../design/components/Typography/Typography'
import IncomeBar from '../IncomeBar/IncomeBar'
import { useActiveYear, useGetBudgetById } from '../../data/Year/YearHooks'
import { rootLens } from '../../data/RootLens'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useOutsideClick } from '../../design/hooks/useOutsideClick'
import CloseIcon from '@mui/icons-material/Close'
import { max } from 'd3-array'
import AddOrEditBudgetModal from '../BudgetModals/AddOrEditBudgetModal'
import { Budget } from '../../data_types/Budget'

const StyledIncomeList = styled.div`
  margin-top: 20px;
`

const IncomeAddButton = styled(IconButton)`
  border-radius: 20px;
  width: 60px;
  border: 1px dotted ${() => colors.darkGrey};
`

const FilterBar = styled.div`
  margin-top: 10px;
  position: relative;
`

const FilterDropDown = styled.div`
  position: absolute;
  z-index: 1000;
  top: 32px;
  left: 0px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  padding: 10px 10px 10px 20px;
`

const StyledFilterItem = styled.span`
  color: ${colors.veryDarkGrey};
  background-color: ${colors.lightGrey};
  padding: 4px 8px 5px 11px;
  margin-right: 10px;
  text-transform: uppercase;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
`

const DeleteFilterButton = styled.button`
  border: none;
  padding: 0;
  margin-left: 5px;
  background-color: transparent;
  color: ${colors.veryDarkGrey};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const FilterItem: React.FC<{ filter: string, onDelete: () => void }> = ({ filter, onDelete }) => {
  return (
    <StyledFilterItem>
      {filter}
      <DeleteFilterButton onClick={onDelete}>
        <CloseIcon style={{ fontSize: 14 }} />
      </DeleteFilterButton>
    </StyledFilterItem>
  )
}

const filterArray = ['emptyHidden', 'onlySummary'] as const
type Filter = typeof filterArray[number]

const filterLabelDict: Record<Filter, string> = {
  emptyHidden: 'Leere verbergen',
  onlySummary: 'Nur Zusammenfassung anzeigen',
} // TODO: In the future this should be replaced with proper localization

interface BudgetMonthListProps {
  incomeOrBudgets: 'budgets' | 'incomeBudgets'
}

const BudgetMonthList: React.FC<BudgetMonthListProps> = ({ incomeOrBudgets }) => {
  const activeYear = useActiveYear()
  const selectedMonth = rootLens.ui.selectedMonth.select()
  const month = activeYear.months[selectedMonth]
  const getBudgetById = useGetBudgetById()

  const [filterDropDownOpen, setFilterDropDownOpen] = useState(false)
  const ref = useOutsideClick(() => setFilterDropDownOpen(false))
  const [filterList, setFilterList] = useState<Filter[]>(['emptyHidden'])

  const toggleFilter = (toggleFilter: Filter) => {
    if (filterList.includes(toggleFilter)) setFilterList(filterList.filter(f => f !== toggleFilter))
    else setFilterList([...filterList, toggleFilter])
  }

  const budgets = month[incomeOrBudgets]
    .filter(i => filterList.includes('emptyHidden') ? (i.base + i.amount !== 0 || i.spent !== 0) : true)
    .sort((a, b) => (b.base + b.amount) - (a.base + a.amount))

  const { variousColors } = colors

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [budgetToEdit, setBudgetToEdit] = useState<Budget>()

  const maxAmount = incomeOrBudgets === 'incomeBudgets'
    ? (month.sumIncomeBudgetsAdded > month.sumIncomes ? month.sumIncomeBudgetsAdded : month.sumIncomes)
    : max(budgets.map(b => b.base + b.amount)) ?? 0

  return (
    <>
      <Headline>{incomeOrBudgets === 'incomeBudgets' ? 'Einkommen' : 'Budgets'}</Headline>

      <FilterBar>
        {filterList.map(filter => (
          <FilterItem
            key={filter}
            filter={filterLabelDict[filter]}
            onDelete={() => toggleFilter(filter)}
          />
        ))}
        <Button
          ref={ref}
          size='small'
          variant='outlined'
          endIcon={<ArrowDropDownIcon />}
          onClick={() => setFilterDropDownOpen(!filterDropDownOpen)}
        >
          Filter
        </Button>
        {filterDropDownOpen && (
          <FilterDropDown>
            <FormGroup>
              {filterArray.map(filter => (
                <FormControlLabel
                  key={filter}
                  checked={filterList.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  control={<Checkbox />}
                  label={filterLabelDict[filter]}
                />
              ))}
            </FormGroup>
          </FilterDropDown>
        )}
        
      </FilterBar>
      
      <StyledIncomeList>
        {incomeOrBudgets === 'incomeBudgets' && (
          <IncomeBar
            label='Summe Einnahmen'
            max={month.sumIncomeBudgetsAdded > month.sumIncomes ? month.sumIncomeBudgetsAdded : month.sumIncomes}
            thisMax={month.sumIncomeBudgetsAdded}
            amount={month.sumIncomes}
            color={variousColors[0]}
          />
        )}
        
        {!filterList.includes('onlySummary') && budgets.map((incomeBudget, index) => (
          <IncomeBar
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
        <IncomeAddButton onClick={() => setAddModalOpen(true)}><AddIcon /></IncomeAddButton>
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
