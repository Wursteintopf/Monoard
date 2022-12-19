import React from 'react'
import { useSelectedMonth } from '../../data/Ui/UiHooks'
import { useActiveYear } from '../../data/Year/hooks/useActiveYear'
import Box from '../../design/components/LayoutElements/Box'
import { Headline } from '../../design/components/Typography/Typography'
import { useSavedState } from '../../hooks/useSavedState'
import { FilterBar } from '../FilterBar/FilterBar'
import MoneyMoveList from '../MoneyMoveList/MoneyMoveList'

type Filter = 'hideWithBudget' | 'hideExpenses' | 'hideIncomes'

const filterOptions: Record<Filter, string> = {
  hideWithBudget: 'Mit Budget verbergen',
  hideExpenses: 'Ausgaben verbergen',
  hideIncomes: 'Einnahmen verbergen',
} // TODO: In the future this should be replaced with proper localization

export const MoneyMoveMonthList: React.FC = () => {
  const selectedMonth = useSelectedMonth()
  const activeYear = useActiveYear()
  const month = activeYear.months[selectedMonth.select()]
  
  const [filterList, setFilterList] = useSavedState<Filter[]>([], 'moneyMoveMonthListFilter')
  
  const moves = [...(!filterList.includes('hideExpenses') ? month.expenses : []), ...(!filterList.includes('hideIncomes') ? month.incomes : [])]
    .filter(m => !filterList.includes('hideWithBudget') || !m.budget)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  return (
    <>
      <Headline>Kontobewegungen</Headline>
      <Box mb='s'>
        <FilterBar<Filter> filterList={filterList} setFilterList={setFilterList} options={filterOptions} />
      </Box>
      <MoneyMoveList moneyMoves={moves} hideColumns={['iban']} />
    </>
  )
}
