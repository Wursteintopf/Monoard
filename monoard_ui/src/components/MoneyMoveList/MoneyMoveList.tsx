import { Button, IconButton, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { rootLens } from '../../data/RootLens'
import Flex from '../../design/components/LayoutElements/Flex'
import { Bold } from '../../design/components/Typography/Typography'
import { clampText } from '../../utils/stringUtils'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import colors from '../../design/variables/colors'
import { MoneyMoveWithFoundBudget } from '../../data/MoneyMoves/MoneyMoveTypes'
import EditMoneyMoveModal from '../EditMoneyMoveModal/EditMoneyMoveModal'
import EditIcon from '@mui/icons-material/Edit'

type MoneyMoveListColumns = 'date' | 'iban' | 'bankAccount' | 'purpose' | 'budget' | 'amount' | 'edit'

interface MoneyMoveListProps {
  moneyMoves: MoneyMoveWithFoundBudget[]
  shortened?: boolean
  linkToDetailpage?: boolean
  hideColumns?: MoneyMoveListColumns[]
}

const DetailCell = styled(TableCell) <{ showTooltip: boolean, detail: string }>`
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
    ${props => props.showTooltip && 'visibility: visible;'}
    ${props => props.showTooltip && 'opacity: 1;'}
  }

  &:hover::before {
    ${props => props.showTooltip && 'visibility: visible;'}
    ${props => props.showTooltip && 'opacity: 1;'}
  }
`

const MoneyMoveList: React.FC<MoneyMoveListProps> = ({ moneyMoves, shortened, linkToDetailpage, hideColumns }) => {
  const hideInternal = rootLens.form.sidebarForm.hideInternal.select()

  const data = useMemo(() => {
    const moves = shortened ? moneyMoves.slice(0, 3) : moneyMoves
    if (hideInternal) return moves.filter(m => !m.isInternalMove)
    return moves
  }, [hideInternal, moneyMoves])

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [moveToEdit, setMoveToEdit] = useState<MoneyMoveWithFoundBudget>()

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
            {data?.map((move, index) => (
              <TableRow key={index}>
                {!hideColumns?.includes('date') && <TableCell>{moment(move.date).format('DD.MM.YYYY')}</TableCell>}
                {!hideColumns?.includes('iban') && <TableCell>{move.foreignBankAccountIban}</TableCell>}
                {!hideColumns?.includes('bankAccount') && <DetailCell showTooltip={move.foreignBankAccount.length > 25} detail={move.foreignBankAccount}>{clampText(move.foreignBankAccount, 25)}</DetailCell>}
                {!hideColumns?.includes('purpose') && <DetailCell showTooltip={move.purpose.length > 25} detail={move.purpose}>{clampText(move.purpose, 25)}</DetailCell>}
                {!hideColumns?.includes('budget') && <TableCell>{move.foundBudget}</TableCell>}
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
            {shortened && (
              <TableRow>
                {!hideColumns?.includes('date') && <TableCell>...</TableCell>}
                {!hideColumns?.includes('iban') && <TableCell>...</TableCell>}
                {!hideColumns?.includes('bankAccount') && <TableCell>...</TableCell>}
                {!hideColumns?.includes('purpose') && <TableCell>...</TableCell>}
                {!hideColumns?.includes('budget') && <TableCell>...</TableCell>}
                {!hideColumns?.includes('amount') && <TableCell>...</TableCell>}
                {!hideColumns?.includes('edit') && <TableCell>...</TableCell>}
              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
      {linkToDetailpage && (
        <Flex>
          <Button
            style={{ marginLeft: 'auto' }}
            component={Link}
            to='money_move_list'
            endIcon={<ArrowForwardIcon />}
          >
            Alle anzeigen
          </Button>
        </Flex>
      )}
      <EditMoneyMoveModal
        open={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        move={moveToEdit!}
      />
    </>
  )
}

export default MoneyMoveList
