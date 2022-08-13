import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React from 'react'
import { FormElement } from './FormTypes'

interface FormButtonProps extends FormElement {
  onClick?: () => void
  disabled?: boolean
}

const StyledButton = styled(Button)`
  padding: 15px;
`

const FormButton: React.FC<FormButtonProps> = (props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      variant='contained'
      disabled={props.disabled}
    >
      {props.label}
    </StyledButton>
  )
}

export default FormButton
