import React from 'react'
import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import colors from '../../variables/colors'
import AddIcon from '@mui/icons-material/Add'

const StyledAddButton = styled(IconButton)`
  border-radius: 20px;
  width: 60px;
  border: 1px dotted ${() => colors.darkGrey};
`

export const AddButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return <StyledAddButton onClick={onClick}><AddIcon /></StyledAddButton>
}
