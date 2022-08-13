import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-top: 5px;
`

interface FormProps { }

export interface FormComponentProps {
  additionalSubmitAction?: () => void
}

const Form: React.FC<PropsWithChildren<FormProps>> = (props) => {
  return (
    <StyledForm>
      {props.children}
    </StyledForm>
  )
}

export default Form
