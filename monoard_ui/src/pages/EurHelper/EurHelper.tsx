import { Button, TextField } from '@mui/material'
import moment from 'moment'
import React, { useCallback, useMemo, useState } from 'react'
import { FilterBar } from '../../components/FilterBar/FilterBar'
import MoneyMoveList from '../../components/MoneyMoveList/MoneyMoveList'
import PageHeader from '../../components/PageHeader/PageHeader'
import { useAllMoneyMoves } from '../../data/Year/hooks/useAllMoneyMoves'
import { MoneyMoveWithSubs } from '../../data/Year/YearTypes'
import Box from '../../design/components/LayoutElements/Box'
import Flex from '../../design/components/LayoutElements/Flex'
import LoadingIndicator from '../../design/components/LoadingIndicator/LoadingIndicator'
import { Headline } from '../../design/components/Typography/Typography'
import { useSavedState } from '../../hooks/useSavedState'

const EurHelper: React.FC = () => {
  const { moneyMoves, isLoading } = useAllMoneyMoves()

  const [hiddenKeywords, setHiddenKeywords] = useSavedState<string[]>([], 'eür_hidden_keywords')
  const [keyword, setKeyword] = useState('')

  const filteredMoneyMoves = useMemo(() => {
    return moneyMoves.filter(m => !hiddenKeywords.some(k => m.foreignBankAccount.includes(k) || m.purpose.includes(k)))
  }, [hiddenKeywords, moneyMoves])

  const exportCsv = useCallback(() => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      'Datum;Bankkonto;Verwendungszweck;Einnahmen;Ausgaben\n' +
      filteredMoneyMoves
        .map(move => `${moment(move.date).format('DD.MM.YYYY')};${move.foreignBankAccount};${move.purpose};${move.amount > 0 ? move.amount.toLocaleString() : ''};${move.amount <= 0 ? move.amount.toLocaleString() : ''}`)
        .join('\n')
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'eur.csv')
    document.body.appendChild(link) // Required for FF

    link.click()
  }, [filteredMoneyMoves])

  if (isLoading) return <LoadingIndicator />
  
  return (
    <>
      <PageHeader
        title='EÜR Helper'
        mainButtons={[
          {
            text: 'Als CSV exportieren',
            onClick: () => exportCsv(),
          },
        ]}
      />

      <Headline>Stichwörter verbergen</Headline>

      <FilterBar<string> filterList={hiddenKeywords} setFilterList={setHiddenKeywords} hideDropdown />
      <Box width='600px' mt='s' mb='m'>
        <Flex>
          <TextField size='small' value={keyword} onChange={e => setKeyword(e.target.value)} />
          <Button
            style={{ paddingLeft: 15, paddingRight: 15 }}
            onClick={() => {
              setHiddenKeywords([...hiddenKeywords, keyword])
              setKeyword('')
            }}
          >
            Stichwort verbergen
          </Button>
        </Flex>
      </Box>
      
      <MoneyMoveList
        moneyMoves={filteredMoneyMoves as MoneyMoveWithSubs[]}
        hideColumns={['iban', 'edit', 'budget']}
        cutTextLength={40}
      />
    </>
  )
}

export default EurHelper
