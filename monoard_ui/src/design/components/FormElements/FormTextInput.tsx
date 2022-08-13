import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { FormInputElement } from './FormTypes'

interface FormTextInputProps extends FormInputElement<string> {
  placeholder?: string
  password?: boolean
}

const FormTextInput: React.FC<FormTextInputProps> = (props) => {
  const { lens, label, placeholder, password, onChangeSideEffect, disabled, variant = 'outlined', setDirty } = props
  const [hide, setHide] = useState(true)

  const value = lens.select()

  let additionalOptions = {}

  if (password) {
    additionalOptions = {
      InputProps: {
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={() => { setHide(!hide) }}
              onMouseDown={e => { e.preventDefault() }}
            >
              {hide ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    }
  }

  return (
    <TextField 
      value={value}
      onChange={e => {
        lens.set(e.target.value)
        if (setDirty) setDirty.set(true)
        if (onChangeSideEffect) onChangeSideEffect(e.target.value)
      }}
      variant={variant}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      type={!password ? 'text' : (hide ? 'password' : 'text')}
      {...additionalOptions}
    />
  )
}

export default FormTextInput
