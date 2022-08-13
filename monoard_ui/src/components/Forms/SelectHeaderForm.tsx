import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useCurrentBankAccount } from '../../data/BankAccounts/BankAccountHooks'
import { rootLens } from '../../data/RootLens'
import ConditionalElement from '../../design/components/ConditionalElement/ConditionalElement'
import FormSelectInput from '../../design/components/FormElements/FormSelectInput'
import FormTextInput from '../../design/components/FormElements/FormTextInput'

const SelectHeaderForm: React.FC = () => {
  const parsedCsv = rootLens.csv.parsedData.select()
  const selectHeaderForm = rootLens.form.selectHeaderForm

  const { bankAccount } = useCurrentBankAccount()

  const options = useMemo(() => {
    if (parsedCsv.length > 0) return Object.keys(parsedCsv[0]).map(header => ({ label: header, value: header }))
    else return []
  }, [parsedCsv])

  useEffect(() => {
    if (bankAccount && bankAccount.csvHeaderConfig) selectHeaderForm.set({ ...bankAccount?.csvHeaderConfig, isDirty: false })
  }, [bankAccount])

  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell><b>Parameter</b></TableCell>
          <TableCell><b>Zugehöriger Header</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Datum</TableCell>
          <TableCell>
            <FormSelectInput
              small
              lens={selectHeaderForm.date}
              options={options}
              setDirty={selectHeaderForm.isDirty}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Datumsformat (z.B. DD.MM.YYYY für deutsche Formatierung)</TableCell>
          <TableCell>
            <FormTextInput
              label='Datumsformat'
              lens={selectHeaderForm.dateFormat}
              setDirty={selectHeaderForm.isDirty}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Auswärtiges Konto (Name)</TableCell>
          <TableCell>
            <FormSelectInput
              small
              lens={selectHeaderForm.foreignBankAccount}
              options={options}
              setDirty={selectHeaderForm.isDirty}
            />
          </TableCell>
        </TableRow>
        <ConditionalElement condition={!bankAccount?.paypalType}>
          <TableRow>
            <TableCell>Auswärtiges Konto (IBAN)</TableCell>
            <TableCell>
              <FormSelectInput
                small
                lens={selectHeaderForm.foreignBankAccountIban}
                options={options}
                setDirty={selectHeaderForm.isDirty}
              />
            </TableCell>
          </TableRow>
        </ConditionalElement>
        <TableRow>
          <TableCell>Verwendungszweck</TableCell>
          <TableCell>
            <FormSelectInput
              small
              lens={selectHeaderForm.purpose}
              options={options}
              setDirty={selectHeaderForm.isDirty}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Betrag</TableCell>
          <TableCell>
            <FormSelectInput
              small
              lens={selectHeaderForm.amount}
              options={options}
              setDirty={selectHeaderForm.isDirty}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default SelectHeaderForm
