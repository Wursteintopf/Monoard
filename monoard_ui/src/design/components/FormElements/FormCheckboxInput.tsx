import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { FormInputElement } from './FormTypes'

interface FormCheckboxProps extends FormInputElement<boolean> {}

const FormCheckboxInput: React.FC<FormCheckboxProps> = (props) => {
  const { lens, label, disabled, onChangeSideEffect, setDirty } = props

  const value = lens.select()

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!!value}
          color='primary'
          disabled={disabled}
          onChange={event => {
            lens.set(event.target.checked)
            if (setDirty) setDirty.set(true)
            if (onChangeSideEffect) onChangeSideEffect(event.target.checked)
          }}
        />
      }
      label={label}
    />
  )
}

export default FormCheckboxInput
