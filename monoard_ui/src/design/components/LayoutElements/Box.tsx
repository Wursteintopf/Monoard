import styled from '@emotion/styled'
import { Size, Spacing } from '../../types'
import spacings from '../../variables/spacings'

export interface BoxProps {
  mt?: Spacing
  mr?: Spacing
  mb?: Spacing
  ml?: Spacing
  height?: Size
  width?: Size
}

const Box = styled.div<BoxProps>`
  ${props => props.mt ? `margin-top: ${spacings[props.mt]};` : ''}
  ${props => props.mr ? `margin-right: ${spacings[props.mr]};` : ''}
  ${props => props.mb ? `margin-bottom: ${spacings[props.mb]};` : ''}
  ${props => props.ml ? `margin-left: ${spacings[props.ml]};` : ''}
  ${props => props.height ? `height: ${props.height};` : ''}
  ${props => props.width ? `width: ${props.width};` : ''}
`

export default Box
