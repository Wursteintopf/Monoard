import { TextField } from '@mui/material'
import React from 'react'
import { FormInputElement } from './FormTypes'

interface FormNumberInputProps extends FormInputElement<number> {
  placeholder?: string
  min?: number
  max?: number
  valueModifier?: (value: number) => number
}

const FormNumberInput: React.FC<FormNumberInputProps> = (props) => {
  const { lens, label, placeholder, disabled, onChangeSideEffect, variant = 'outlined', setDirty, min, max, valueModifier } = props

  const value = lens.select()

  return (
    <TextField 
      value={valueModifier ? valueModifier(value) : value}
      onChange={e => {
        lens.set(valueModifier ? valueModifier(parseFloat(e.target.value)) : parseFloat(e.target.value))
        if (setDirty) setDirty.set(true)
        if (onChangeSideEffect) onChangeSideEffect(parseFloat(e.target.value))
      }}
      variant={variant}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      InputProps={{ inputProps: { min, max } }}
      type='number'
    />
  )
}

export default FormNumberInput
