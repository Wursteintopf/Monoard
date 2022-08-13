import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import colors from '../../variables/colors'

export const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, ${colors.baseBlue} 0%, ${colors.baseGreen} 100%);;
`

interface BackgroundProps {}

const BackgroundGradient: React.FC<PropsWithChildren<BackgroundProps>> = (props) => {
  const { children } = props

  return (
    <StyledBackground>
      {children}
    </StyledBackground>
  )
}

export default BackgroundGradient
