import styled from '@emotion/styled'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import Box from '../../design/components/LayoutElements/Box'
import { Bold, Headline, SmallText } from '../../design/components/Typography/Typography'
import AddIcon from '@mui/icons-material/Add'
import AddOrEditBudgetModal from '../BudgetModals/AddOrEditBudgetModal'
import { Budget } from '../../data_types/Budget'
import { useDeleteBudget } from '../../data/Budgets/BudgetHooks'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FormButton from '../../design/components/FormElements/FormButton'
import Form from '../../design/components/FormElements/Form'
import { Month, monthArray, monthsReadableGerman } from '../../data_types/Month'
import { useActiveYear } from '../../data/Year/hooks/useActiveYear'

export const FirstCell = styled(TableCell)`
  width: 12%;
`

export const MonthCell = styled(TableCell)`
  width: 5%;
  padding: 4px 12px;
`

export const ButtonCell = styled(TableCell)`
  width: 7%;
`

export const BudgetPlanMatrix: React.FC = () => {
  const activeYear = useActiveYear()
  const deleteBudget = useDeleteBudget()

  const [budgetToEdit, setBudgetToEdit] = useState<Budget>()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isIncome, setIsIncome] = useState(false)

  const renderMonthCell = (month: Month, budget: Budget, budgetOrIncome: 'budgets' | 'incomeBudgets') => (
    <MonthCell key={month}>
      <SmallText>{(activeYear.months[month][budgetOrIncome].find(b => b.slug === budget.slug)?.spent ?? 0).toFixed(2)}€ /</SmallText><br />
      {(budget[month] ?? 0).toFixed(2)}€<br />
    </MonthCell>
  )

  return (
    <>
      <Box mb='m'>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <FirstCell />
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    <Bold>{monthsReadableGerman[month]}</Bold>
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <FirstCell>Summe Eingänge</FirstCell>
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    {activeYear.months[month].sumIncomes.toFixed(2)}{' '}
                    €
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
              <TableRow>
                <FirstCell>Summe Ausgänge</FirstCell>
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    {activeYear.months[month].sumExpenses.toFixed(2)}{' '}
                    €
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
              <TableRow>
                <FirstCell>Summe Geplante Eingänge</FirstCell>
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    {activeYear.months[month].sumIncomeBudgetsAdded.toFixed(2)}{' '}
                    €
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
              <TableRow>
                <FirstCell>Summe Budgets</FirstCell>
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    {activeYear.months[month].sumBudgetsAdded.toFixed(2)} €
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
              <TableRow>
                <FirstCell>Differenz</FirstCell>
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    {(activeYear.months[month].sumIncomeBudgetsAdded - activeYear.months[month].sumBudgetsAdded).toFixed(2)} €
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mb='m'>
        <Headline>Geplante Eingänge</Headline>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <FirstCell />
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    <Bold>{monthsReadableGerman[month]}</Bold>
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {activeYear.incomeBudgets.map((incomeBudget) => (
                <TableRow key={incomeBudget.id}>
                  <FirstCell>{incomeBudget.name}</FirstCell>
                  {monthArray.map((month) => renderMonthCell(month, incomeBudget, 'incomeBudgets'))}
                  <ButtonCell>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setBudgetToEdit(incomeBudget)
                        setIsIncome(true)
                        setAddModalOpen(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setBudgetToEdit(incomeBudget)
                        setDeleteModalOpen(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ButtonCell>
                </TableRow>
              ))}
              <TableRow>
                <FirstCell>
                  <Button
                    onClick={() => {
                      setBudgetToEdit(undefined)
                      setAddModalOpen(true)
                      setIsIncome(true)
                    }}
                    startIcon={<AddIcon />}
                  >
                    Hinzufügen
                  </Button>
                </FirstCell>
                {monthArray.map((month) => (
                  <MonthCell key={month} />
                ))}
                <ButtonCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mb='m'>
        <Headline>Budgets</Headline>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <FirstCell />
                {monthArray.map((month) => (
                  <MonthCell key={month}>
                    <Bold>{monthsReadableGerman[month]}</Bold>
                  </MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {activeYear.budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <FirstCell>{budget.name}</FirstCell>
                  {monthArray.map((month) => renderMonthCell(month, budget, 'budgets'))}
                  <ButtonCell>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setBudgetToEdit(budget)
                        setIsIncome(false)
                        setAddModalOpen(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setBudgetToEdit(budget)
                        setDeleteModalOpen(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ButtonCell>
                </TableRow>
              ))}
              <TableRow>
                <FirstCell>
                  <Button
                    onClick={() => {
                      setBudgetToEdit(undefined)
                      setAddModalOpen(true)
                      setIsIncome(false)
                    }}
                    startIcon={<AddIcon />}
                  >
                    Hinzufügen
                  </Button>
                </FirstCell>
                {monthArray.map((month) => (
                  <MonthCell key={month} />
                ))}
                <ButtonCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <AddOrEditBudgetModal
        open={addModalOpen}
        budgetToEdit={budgetToEdit}
        isIncome={isIncome}
        onClose={() => {
          setAddModalOpen(false)
        }}
      />

      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>
          {isIncome ? 'Geplanten Eingang löschen' : 'Budget löschen'}
        </DialogTitle>
        <DialogContent>
          <Form>
            <FormButton
              onClick={() => {
                deleteBudget(budgetToEdit?.id ?? -1)
                setDeleteModalOpen(false)
              }}
              label='Löschen'
            />
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
