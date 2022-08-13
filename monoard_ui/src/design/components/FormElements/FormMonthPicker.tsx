import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import React from 'react'
import { FormInputElement } from './FormTypes'

interface FormPickerProps extends FormInputElement<Date> {

}

const FormMonthPicker: React.FC<FormPickerProps> = (props) => {
  const { lens, label, disabled, onChangeSideEffect, variant = 'outlined', setDirty } = props

  const value = moment(lens.select())

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        views={['month', 'year']}
        label={label}
        value={value}
        disabled={disabled}
        onChange={value => {
          if (value) lens.set(value.toDate())
          if (setDirty) setDirty.set(true)
          if (value && onChangeSideEffect) onChangeSideEffect(value.toDate())
        }}
        renderInput={(params: any) => <TextField {...params} variant={variant} helperText={null} />}
      />
    </LocalizationProvider>
  )
}

export default FormMonthPicker
