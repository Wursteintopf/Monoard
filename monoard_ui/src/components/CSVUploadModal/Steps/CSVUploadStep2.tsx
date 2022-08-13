import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useCurrentBankAccount } from '../../../data/BankAccounts/BankAccountHooks'
import { bankAccountApi } from '../../../data/BankAccounts/BankAccountReducer'
import { rootLens } from '../../../data/RootLens'
import Box from '../../../design/components/LayoutElements/Box'
import Flex from '../../../design/components/LayoutElements/Flex'
import { NoWrap, SmallText, Text } from '../../../design/components/Typography/Typography'
import SelectHeaderForm from '../../Forms/SelectHeaderForm'
import { StepProp } from '../CSVUploadModal'

const DetectedCSV: React.FC = () => {
  const parsedCsv = rootLens.csv.parsedData.select()

  const [dataShortened, setDataShortened] = useState(false)

  const shortenedData = useMemo(() => {
    if (parsedCsv.length > 3) {
      setDataShortened(true)
      return parsedCsv.slice(0, 3)
    } else {
      setDataShortened(false)
      return parsedCsv
    }
  }, [parsedCsv])

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        {shortenedData.length > 0 && (
          <TableHead>
            <TableRow>
              {Object.keys(shortenedData[0]).map(header => (
                <TableCell key={header}>
                  <NoWrap>
                    <SmallText>{header}</SmallText>
                  </NoWrap>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {shortenedData.map((row, index) => (
            <TableRow key={index}>
              {Object.keys(row).map(key => (
                <TableCell key={key}>
                  <NoWrap>
                    <SmallText>{row[key]}</SmallText>
                  </NoWrap>
                </TableCell>
              ))}
            </TableRow>
          ))}
          {dataShortened && (
            <TableRow>
              <TableCell>...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const CSVUploadStep2: React.FC<StepProp> = ({ setStep }) => {
  const { bankAccount } = useCurrentBankAccount()
  const { amount, date, dateFormat, foreignBankAccount, foreignBankAccountIban, purpose } = rootLens.form.selectHeaderForm.select()
  const enableForward = (!!amount && !!date && !!dateFormat && !!foreignBankAccount && (bankAccount?.paypalType || !!foreignBankAccountIban) && !!purpose)
  const isDirty = rootLens.form.selectHeaderForm.isDirty.select()

  const { data, isFetching } = useCurrentBankAccount()
  const [saveBankaccountMutation] = bankAccountApi.endpoints.editOwn.useMutation()

  const savePreset = () => {
    if (data) {
      saveBankaccountMutation({
        ...data,
        csvHeaderConfig: {
          id: data?.csvHeaderConfig?.id || undefined,
          amount,
          date,
          dateFormat,
          foreignBankAccount,
          foreignBankAccountIban,
          purpose,
        },
      })
      rootLens.form.selectHeaderForm.isDirty.set(false)
    }
  }

  return (
    <div>
      <Text>Folgende CSV Datei wurde erkannt:</Text>

      <Box mt='m' mb='m'>
        <DetectedCSV />
      </Box>

      <Text>Bitte ordne die Header korrekt zu, damit wir wissen, was wohin gehört:</Text>
        
      <Box mt='m' mb='m'>
        <SelectHeaderForm />
      </Box>

      <Flex mt='m'>
        <Button
          onClick={() => setStep(0)}
        >
          Zurück
        </Button>
        <Button
          disabled={!enableForward || isFetching || !isDirty}
          style={{ marginLeft: 'auto' }}
          onClick={savePreset}
        >
          Header als Vorlage speichern
        </Button>
        <Button
          disabled={!enableForward}
          onClick={() => setStep(2)}
        >
          Weiter
        </Button>
      </Flex>
    </div>
  )
}

export default CSVUploadStep2
