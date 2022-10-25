import { Button, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCurrentBankAccount } from '../../../data/BankAccounts/BankAccountHooks'
import { moneyMoveApi } from '../../../data/MoneyMoves/MoneyMovesReducer'
import { rootLens } from '../../../data/RootLens'
import { MoneyMove } from '../../../data_types/MoneyMove'
import Box from '../../../design/components/LayoutElements/Box'
import Flex from '../../../design/components/LayoutElements/Flex'
import { StepProp } from '../CSVUploadModal'
import moment from 'moment'
import { monthArray } from '../../../data_types/Month'

const CSVUploadStep3: React.FC<StepProp & { onClose: () => void }> = ({ setStep, onClose }) => {
  const parsedCsv = rootLens.csv.parsedData.select()
  const headers = rootLens.form.selectHeaderForm.select()
  const [percentage, setPercentage] = useState(0)

  const { bankAccount, refetchCurrentBankAccount } = useCurrentBankAccount()

  const [addMultipleMoneyMovesMutation] = moneyMoveApi.endpoints.createMultipleOwn.useMutation()

  const parseAsNumber = (input: string): number => {
    const output = Number(input.replace('.', '').replace(',', '.'))
    if (isNaN(output)) {
      throw new Error('Number could not be parsed: ' + input)
    }
    return output
  }

  const parseDate = (input: string, format: string) => {
    return moment(input, format)
  }

  useEffect(() => {
    if (parsedCsv && bankAccount) {
      const moneyMoves: MoneyMove[] = parsedCsv.map(csv => {
        const foreignBankAccount =
          (bankAccount.paypalType && csv.Typ && (csv.Typ.includes('Bankgutschrift auf PayPal-Konto') || csv.Typ.includes('Allgemeine Abbuchung')))
            ? (bankAccount && bankAccount.connectedBankAccount && typeof bankAccount.connectedBankAccount !== 'number' && bankAccount.connectedBankAccount.name)
            : csv[headers.foreignBankAccount].substring(0, 255)

        return {
          date: parseDate(csv[headers.date], headers.dateFormat).toDate(),
          month: monthArray[parseDate(csv[headers.date], headers.dateFormat).month()],
          foreignBankAccount: foreignBankAccount || '',
          foreignBankAccountIban: headers.foreignBankAccountIban ? csv[headers.foreignBankAccountIban].substring(0, 255) : '',
          purpose: csv[headers.purpose].substring(0, 255),
          amount: parseAsNumber(csv[headers.amount]),
          isInternalMove: !bankAccount.paypalType ? false : (csv.Typ.includes('Bankgutschrift auf PayPal-Konto') || csv.Typ.includes('Allgemeine Abbuchung')), // TODO: This should not be hardcoded (and support more languages)
          bankAccount: bankAccount.id as number,
        } 
      })

      const sendDataInChunks = async () => {
        const chunkSize = 10
        const amountOfChunks = Math.ceil(moneyMoves.length / chunkSize)
        const chunks = Array.from(Array(amountOfChunks).keys())

        for await (const chunkIndex of chunks) {
          const i = chunkIndex * chunkSize
          const chunk = moneyMoves.slice(i, i + chunkSize)
          await addMultipleMoneyMovesMutation(chunk).unwrap()
          setPercentage((i / moneyMoves.length) * 100)
        }
      }

      sendDataInChunks().then(() => setPercentage(100)).catch(e => console.log(e))
      refetchCurrentBankAccount()
    }
  }, [])

  return (
    <div>
      <Box mt='m' mb='m'>
        <LinearProgress variant='determinate' value={percentage} />
      </Box>
      <Flex mt='m' justifyContent='space-between'>
        <Button
          onClick={() => setStep(0)}
        >
          Zurück
        </Button>
        <Button
          disabled={percentage !== 100}
          onClick={onClose}
        >
          Abschließen
        </Button>
      </Flex>
    </div>
  )
}

export default CSVUploadStep3
