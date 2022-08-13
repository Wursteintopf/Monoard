import { SelectOption } from '@mui/base'
import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { FormInputElement } from './FormTypes'

interface FormSelectInputProps extends FormInputElement<any> {
  options: SelectOption<any>[]
  small?: boolean
}

const FormSelectInput: React.FC<FormSelectInputProps> = (props) => {
  const { label, options, onChangeSideEffect, lens, disabled, small, variant = 'outlined', setDirty } = props

  const value = lens.select()

  return (
    <Select
      value={value}
      label={label}
      variant={variant}
      disabled={disabled}
      size={small ? 'small' : undefined}
      onChange={event => {
        lens.set(event.target.value)
        if (setDirty) setDirty.set(true)
        if (onChangeSideEffect) onChangeSideEffect(event.target.value)
      }}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  )
}

export default FormSelectInput
