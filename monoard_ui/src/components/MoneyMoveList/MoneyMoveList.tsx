import { IconButton, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { Bold } from '../../design/components/Typography/Typography'
import { clampText } from '../../utils/stringUtils'
import colors from '../../design/variables/colors'
import EditMoneyMoveModal from '../EditMoneyMoveModal/EditMoneyMoveModal'
import EditIcon from '@mui/icons-material/Edit'
import { MoneyMoveWithSubs } from '../../data/Year/YearTypes'

type MoneyMoveListColumns = 'date' | 'iban' | 'bankAccount' | 'purpose' | 'budget' | 'amount' | 'edit'

interface MoneyMoveListProps {
  moneyMoves: MoneyMoveWithSubs[]
  hideColumns?: MoneyMoveListColumns[]
  cutTextLength?: number
}

const DetailCell = styled(TableCell) <{ abbreviation: boolean, detail: string }>`
  position: relative;

  &:before {
    position: absolute;
    left: 30px;
    bottom: 25px;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid ${colors.black};
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;
  }

  &:after {
    position: absolute;
    left: 15px;
    bottom: 35px;
    z-index: 100;
    content: "${props => props.detail}";
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;
    background-color: ${colors.black};
    color: ${colors.white};
    font-size: 0.8em;
    padding: 5px 10px;
    border-radius: 5px;
  }

  &:hover::after {
    ${props => props.abbreviation && 'visibility: visible;'}
    ${props => props.abbreviation && 'opacity: 1;'}
  }

  &:hover::before {
    ${props => props.abbreviation && 'visibility: visible;'}
    ${props => props.abbreviation && 'opacity: 1;'}
  }
`

const MoneyMoveList: React.FC<MoneyMoveListProps> = ({ moneyMoves, hideColumns, cutTextLength = 25 }) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [moveToEdit, setMoveToEdit] = useState<MoneyMoveWithSubs>()

  return (
    <>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              {!hideColumns?.includes('date') && <TableCell><Bold>Datum</Bold></TableCell>}
              {!hideColumns?.includes('iban') && <TableCell><Bold>IBAN</Bold></TableCell>}
              {!hideColumns?.includes('bankAccount') && <TableCell><Bold>Zahlungsempfänger</Bold></TableCell>}
              {!hideColumns?.includes('purpose') && <TableCell><Bold>Verwendungszweck</Bold></TableCell>}
              {!hideColumns?.includes('budget') && <TableCell><Bold>Budget</Bold></TableCell>}
              {!hideColumns?.includes('amount') && <TableCell><Bold>Betrag</Bold></TableCell>}
              {!hideColumns?.includes('edit') && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {moneyMoves?.map((move, index) => (
              <TableRow key={index}>
                {!hideColumns?.includes('date') && <TableCell>{moment(move.date).format('DD.MM.YYYY')}</TableCell>}
                {!hideColumns?.includes('iban') && <TableCell>{move.foreignBankAccountIban}</TableCell>}
                {!hideColumns?.includes('bankAccount') && <DetailCell abbreviation={move.foreignBankAccount.length > cutTextLength} detail={move.foreignBankAccount}>{clampText(move.foreignBankAccount, cutTextLength)}</DetailCell>}
                {!hideColumns?.includes('purpose') && <DetailCell abbreviation={move.purpose.length > cutTextLength} detail={move.purpose}>{clampText(move.purpose, cutTextLength)}</DetailCell>}
                {!hideColumns?.includes('budget') && <TableCell>{move.budget?.name ?? ''}</TableCell>}
                {!hideColumns?.includes('amount') && <TableCell>{move.amount.toFixed(2)} €</TableCell>}
                {!hideColumns?.includes('edit') &&
                  <TableCell>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setIsOpenEditModal(true)
                        setMoveToEdit(move)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditMoneyMoveModal
        open={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        move={moveToEdit!}
      />
    </>
  )
}

export default MoneyMoveList
