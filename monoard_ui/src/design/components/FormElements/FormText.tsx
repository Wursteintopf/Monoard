import React, { PropsWithChildren } from 'react'

interface FormTextProps {}

const FormText: React.FC<PropsWithChildren<FormTextProps>> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

export default FormText
