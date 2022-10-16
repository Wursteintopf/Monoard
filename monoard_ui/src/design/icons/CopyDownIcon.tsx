import { SvgIcon } from '@mui/material'
import React from 'react'

export const CopyDownIcon: React.FC<{ fontSize?: 'inherit' | 'small' }> = ({ fontSize }) => {
  return (
    <SvgIcon fontSize={fontSize}>
      <path d='M16,1H4C2.9,1,2,1.9,2,3v14h2V3h12V1z' />
      <path d='M8,21V7h11v3.9h2V7c0-1.1-0.9-2-2-2H8C6.9,5,6,5.9,6,7v14c0,1.1,0.9,2,2,2h9.8l-0.9-2H8z' />
      <polygon points='21,17.1 21,12.9 21,12.9 19,12.9 19,12.9 19,17.1 17.3,17.1 19,20.8 19.9,22.8 20,23 20.2,22.6 21,20.8 22.7,17.1' />
    </SvgIcon>
  )
}
