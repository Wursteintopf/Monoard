import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import colors from '../../../design/variables/colors'
import Papa from 'papaparse'
import { Button } from '@mui/material'
import Flex from '../../../design/components/LayoutElements/Flex'
import LoadingIndicator from '../../../design/components/LoadingIndicator/LoadingIndicator'
import { rootLens } from '../../../data/RootLens'
import { StepProp } from '../CSVUploadModal'
import { useCurrentBankAccount } from '../../../data/BankAccounts/BankAccountHooks'
import { CSVHeaderConfig } from '@wursteintopf/monoard_data_models'

const StyledUploadArea = styled.div`
  border: 1px dashed ${colors.darkGrey};
  background-color: ${colors.baseGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  border-radius: 5px;
`

const CSVUploadStep1: React.FC<StepProp> = ({ setStep }) => {
  const [isParsing, setIsParsing] = useState(false)
  const csvParsedLens = rootLens.csv.parsedData
  const headerForm = rootLens.form.selectHeaderForm

  const { bankAccount } = useCurrentBankAccount()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  })

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setIsParsing(true)
      Papa.parse(acceptedFiles[0], {
        header: true,
        skipEmptyLines: true,
        complete: result => {
          setIsParsing(false)
          let data = result.data as Record<string, string>[]
          if (bankAccount?.paypalType === true) {
            data = data.filter(r => (
              r.Typ !== 'Einbehaltung für offene Autorisierung' && // TODO: This should not be hardcoded (and support multiple languages)
              r.Typ !== 'Rückbuchung allgemeiner Einbehaltung'
            ))
          }
          csvParsedLens.set(data)
        },
      })
    }
  }, [acceptedFiles])

  return (
    <>
      <StyledUploadArea {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          {isParsing && <LoadingIndicator />}
          {acceptedFiles.length > 0 ? acceptedFiles[0].name : 'Drag and drop a CSV file here, or click to select one'}
        </div>
      </StyledUploadArea>
      <Flex mt='m'>
        <Button
          style={{ marginLeft: 'auto' }}
          disabled={acceptedFiles.length <= 0}
          onClick={() => setStep(1)}
        >
          Weiter
        </Button>
        {bankAccount?.csvHeaderConfig && (
          <Button
            disabled={acceptedFiles.length <= 0}
            onClick={() => {
              setStep(2)
              headerForm.set({ ...bankAccount.csvHeaderConfig as CSVHeaderConfig, isDirty: false })
            }}
          >
            Gespeicherte Header verwenden
          </Button>
        )}
      </Flex>
    </>
    
  )
}

export default CSVUploadStep1
