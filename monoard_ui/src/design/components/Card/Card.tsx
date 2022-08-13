import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import { Nullable } from '../../../data_types/UtilTypes'
import { Color, Size, Spacing } from '../../types'
import colors from '../../variables/colors'
import spacings from '../../variables/spacings'
import Box from '../LayoutElements/Box'

interface CardProps {
  pv: Spacing
  ph: Spacing
  variant: 'contained' | 'outlined'
  backgroundColor: Color
  borderColor: Color
  width?: Size
}

const StyledCard = styled(Box)<CardProps>`
  background: ${props => props.backgroundColor};
  padding: ${(props) => `${spacings[props.pv]} ${spacings[props.ph]}`};
  border-radius: 15px;
  ${props => props.variant === 'outlined' && `border: 1px solid ${props.borderColor}`}
`

const Card: React.FC<PropsWithChildren<Nullable<CardProps>>> = (props) => {
  const {
    children,
    pv = 'l',
    ph = 'l',
    backgroundColor = colors.white,
    variant = 'contained',
    borderColor = colors.lightBlue,
    width,
  } = props

  return (
    <StyledCard
      pv={pv}
      ph={ph}
      backgroundColor={backgroundColor}
      variant={variant}
      borderColor={borderColor}
      width={width}
    >
      {children}
    </StyledCard>
  )
}

export default Card
