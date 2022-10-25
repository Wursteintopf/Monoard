import styled from '@emotion/styled'
import { Spacing } from '../../types'
import spacings from '../../variables/spacings'
import Box, { BoxProps } from './Box'

export interface FlexProps extends BoxProps {
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  alignItems?: 'start' | 'end' | 'center' | 'stretch'
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: Spacing
}

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${props => props.justifyContent ? `justify-content: ${props.justifyContent};` : ''}
  ${props => props.alignItems ? `align-items: ${props.alignItems};` : ''}
  ${props => props.gap ? `gap: ${spacings[props.gap]};` : ''} 
  ${props => props.flexDirection ? `flex-direction: ${props.flexDirection};` : ''} 
  ${props => props.flexWrap ? `flex-wrap: ${props.flexWrap};` : ''} 
`

export default Flex
