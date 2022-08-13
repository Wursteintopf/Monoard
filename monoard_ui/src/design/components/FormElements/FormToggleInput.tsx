import React from 'react'
import { Lens } from '../../../data/RootLens'

interface FormToogleProps {
  lens: Lens<boolean>
  label?: string
  placeholder?: string
}

const FormToggleInput: React.FC<FormToogleProps> = (props) => {
  const { lens, label, placeholder } = props

  const value = lens.select()

  // TODO: Fix this
  return <></>
}

export default FormToggleInput
