import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import React from 'react'
import Center from '../LayoutElements/Center'

export const LoadingIndicatorContainer = styled.div`
  height: 90%;
`

const LoadingIndicator: React.FC = () => {
  return (
    <LoadingIndicatorContainer>
      <Center>
        <CircularProgress />
      </Center>
    </LoadingIndicatorContainer>
  )
}

export default LoadingIndicator
