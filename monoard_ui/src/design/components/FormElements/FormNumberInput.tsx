import { TextField, TextFieldProps } from '@mui/material'
import React, { ReactNode } from 'react'
import { FormInputElement } from './FormTypes'

type FormNumberInputProps = TextFieldProps & FormInputElement<number> & {
  placeholder?: string
  min?: number
  max?: number
  valueModifier?: (value: number) => number
  unit?: ReactNode
}

const FormNumberInput: React.FC<FormNumberInputProps> = (props) => {
  const { lens, onChangeSideEffect, variant = 'outlined', setDirty, min, max, valueModifier, unit, ...rest } = props

  const value = lens.select()
  
  const modified = valueModifier ? valueModifier(value || 0) : value

  return (
    <TextField 
      value={modified}
      onChange={e => {
        lens.set(valueModifier ? valueModifier(parseFloat(e.target.value)) : parseFloat(e.target.value))
        if (setDirty) setDirty.set(true)
        if (onChangeSideEffect) onChangeSideEffect(parseFloat(e.target.value))
      }}
      variant={variant}
      InputProps={{
        inputProps: { min, max },
        startAdornment: <span style={{ marginRight: 5 }}>{unit}</span>,
      }}
      type='number'
      {...rest}
    />
  )
}

export default FormNumberInput
