import { Button, Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import { useAllYears } from '../../data/Year/hooks/useAllYears'
import Box from '../../design/components/LayoutElements/Box'
import { Bold, Headline } from '../../design/components/Typography/Typography'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import AddIcon from '@mui/icons-material/Add'
import Form from '../../design/components/FormElements/Form'
import FormNumberInput from '../../design/components/FormElements/FormNumberInput'
import { rootLens } from '../../data/RootLens'
import FormButton from '../../design/components/FormElements/FormButton'
import { yearApi } from '../../data/Year/YearReducer'
import DeleteIcon from '@mui/icons-material/Delete'

const Settings: React.FC = () => {
  const years = useAllYears()
  const addYearForm = rootLens.form.addYearForm

  const [addYearModalOpen, setAddYearModalOpen] = useState(false)
  const selectedYear = addYearForm.year.select()

  const [createYearMutation] = yearApi.endpoints.createOwn.useMutation()
  const [deleteYearMutation] = yearApi.endpoints.deleteOwn.useMutation()
  const [activateYearMutation] = yearApi.endpoints.activateYear.useMutation()

  const [deleteYearModalOpen, setDeleteYearModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(-1)

  return (
    <>
      <PageHeader title='Einstellungen' />

      <Headline>Jahres Einstellungen</Headline>

      <Box width='400px' mt='m'>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Bold>Jahr</Bold>
                </TableCell>
                <TableCell>
                  <Bold>Aktiv</Bold>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {years?.map((year) => (
                <TableRow key={year.year}>
                  <TableCell>{year.year}</TableCell>
                  <TableCell>
                    {year.active
                      ? (
                        <IconButton>
                          <CheckBoxIcon />
                        </IconButton>
                        )
                      : (
                        <IconButton onClick={() => activateYearMutation(year.year)}>
                          <CheckBoxOutlineBlankIcon />
                        </IconButton>
                        )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setDeleteYearModalOpen(true)
                        setDeleteId(year.id!)
                      }}
                    ><DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Button onClick={() => setAddYearModalOpen(true)} startIcon={<AddIcon />}>
                    Hinzufügen
                  </Button>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={addYearModalOpen} onClose={() => setAddYearModalOpen(false)}>
        <DialogTitle>Jahr hinzufügen</DialogTitle>
        <DialogContent>
          <Form>
            <FormNumberInput lens={addYearForm.year} />
            <FormButton
              disabled={years?.some(y => selectedYear === y.year)}
              onClick={() => {
                createYearMutation({ year: selectedYear, active: false })
                setAddYearModalOpen(false)
              }}
              label='Speichern'
            />
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteYearModalOpen} onClose={() => setDeleteYearModalOpen(false)}>
        <DialogTitle>Das Jahr {years?.find(y => y.id === deleteId)?.year} wirklich löschen?</DialogTitle>
        <DialogContent>
          <Form>
            <FormButton
              onClick={() => {
                deleteYearMutation(deleteId)
                setDeleteYearModalOpen(false)
              }}
              label='Löschen'
            />
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Settings
