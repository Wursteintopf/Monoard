import { Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper } from '@mui/material'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useCurrentBankAccount } from '../../data/BankAccounts/BankAccountHooks'
import { defaultSelectHeaderForm } from '../../data/Forms/FormTypes'
import { rootLens } from '../../data/RootLens'
import Box from '../../design/components/LayoutElements/Box'
import { SmallText } from '../../design/components/Typography/Typography'
import colors from '../../design/variables/colors'
import { ModalProps } from '../../types/ModalProps'
import CSVUploadStep1 from './Steps/CSVUploadStep1'
import CSVUploadStep2 from './Steps/CSVUploadStep2'
import CSVUploadStep3 from './Steps/CSVUploadStep3'

interface CSVUploadModalProps extends ModalProps { }

export interface StepProp {
  setStep: Dispatch<SetStateAction<number>>
}

const CSVUploadModal: React.FC<CSVUploadModalProps> = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const headerForm = rootLens.form.selectHeaderForm
  const parsedCsv = rootLens.csv.parsedData
  
  const { data } = useCurrentBankAccount()

  const isOptionalProps = useMemo(() => {
    if (data?.csvHeaderConfig) {
      return {
        optional: <SmallText color={colors.darkGrey}>Optional</SmallText>,
      }
    } else return {}
  }, [data])

  const closeAndCleanUp = () => {
    onClose()
    setCurrentStep(0)
    headerForm.set(defaultSelectHeaderForm)
    parsedCsv.set([])
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CSVUploadStep1 setStep={setCurrentStep} />
      case 1:
        return <CSVUploadStep2 setStep={setCurrentStep} />
      case 2:
        return <CSVUploadStep3 setStep={setCurrentStep} onClose={closeAndCleanUp} />
    }
  }

  return (
    <Dialog
      open={open}
      onClose={closeAndCleanUp}
      maxWidth='xl'
    >
      <DialogTitle>Geldbewegungen hinzufügen</DialogTitle>
      <DialogContent>
        <Stepper activeStep={currentStep}>
          <Step completed={currentStep > 0}><StepLabel>CSV hochladen</StepLabel></Step>
          <Step completed={currentStep > 1}><StepLabel {...isOptionalProps}>Header zuordnen</StepLabel></Step>
          <Step completed={currentStep > 2}><StepLabel>Daten hochladen</StepLabel></Step>
        </Stepper>
        <Box width='700px' mt='m'>
          {renderStep()}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CSVUploadModal
