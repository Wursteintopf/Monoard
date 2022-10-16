import styled from '@emotion/styled'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { useActiveYear } from '../../data/Year/YearHooks'
import Box from '../../design/components/LayoutElements/Box'
import { Bold, Headline } from '../../design/components/Typography/Typography'
import AddIcon from '@mui/icons-material/Add'
import AddOrEditBudgetModal from '../BudgetModals/AddOrEditBudgetModal'
import { Budget } from '../../data_types/Budget'
import { useDeleteBudget } from '../../data/Budgets/BudgetHooks'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FormButton from '../../design/components/FormElements/FormButton'
import Form from '../../design/components/FormElements/Form'
import { monthArray, monthsReadableGerman } from '../../data_types/Month'

export const FirstCell = styled(TableCell)`
  width: 9%;
`

export const MonthCell = styled(TableCell)`
  width: 6%;
  padding: 6px 12px;
`

export const ButtonCell = styled(TableCell)`
  width: 7%;
`

export const BudgetPlanMatrix: React.FC = () => {
  const activeYear = useActiveYear()
  const deleteBudget = useDeleteBudget()

  const expectedIncomes = activeYear.expectedIncomes
  const budgets = activeYear.budgets

  const [budgetToEdit, setBudgetToEdit] = useState<Budget>()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isIncome, setIsIncome] = useState(false)

  return (
    <>
      <Box mb='m'>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <FirstCell />
                {monthArray.map(month => (
                  <MonthCell key={month}><Bold>{monthsReadableGerman[month]}</Bold></MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <FirstCell>Summe Eingänge</FirstCell>
                {monthArray.map(month => (
                  <MonthCell key={month} />
                ))}
                <ButtonCell />
              </TableRow>
              <TableRow>
                <FirstCell>Summe Budgets</FirstCell>
                {monthArray.map(month => (
                  <MonthCell key={month} />
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
                {monthArray.map(month => (
                  <MonthCell key={month}><Bold>{monthsReadableGerman[month]}</Bold></MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {expectedIncomes.map(income => (
                <TableRow key={income.id}>
                  <FirstCell>{income.name}</FirstCell>
                  {monthArray.map(month => (
                    <MonthCell key={month}>{income[month].toFixed(2)} €</MonthCell>
                  ))}
                  <ButtonCell>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setBudgetToEdit(income)
                        setIsIncome(true)
                        setAddModalOpen(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setBudgetToEdit(income)
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
                {monthArray.map(month => (
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
                {monthArray.map(month => (
                  <MonthCell key={month}><Bold>{monthsReadableGerman[month]}</Bold></MonthCell>
                ))}
                <ButtonCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets.map(budget => (
                <TableRow key={budget.id}>
                  <FirstCell>{budget.name}</FirstCell>
                  {monthArray.map(month => (
                    <MonthCell key={month}>{budget[month].toFixed(2)} €</MonthCell>
                  ))}
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
                {monthArray.map(month => (
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
        <DialogTitle>{isIncome ? 'Geplanten Eingang löschen' : 'Budget löschen'}</DialogTitle>
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
