import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import { Spacing } from '../../types'
import colors from '../../variables/colors'
import spacings from '../../variables/spacings'

interface EmptyProps { }

export interface TextProps {
  mt?: Spacing
  mr?: Spacing
  mb?: Spacing
  ml?: Spacing
}

export const MainHeadline = styled.h1`
  font-size: 2em;
  margin: 0;
`

export const Headline = styled.h2<TextProps>`
  font-size: 1.5em;
  margin: 0;
  ${props => props.mt ? `margin-top: ${spacings[props.mt]};` : ''}
  ${props => props.mr ? `margin-right: ${spacings[props.mr]};` : ''}
  ${props => props.mb ? `margin-bottom: ${spacings[props.mb]};` : ''}
  ${props => props.ml ? `margin-left: ${spacings[props.ml]};` : ''}
`

export const Text = styled.span<{ color?: string }>`
  color: ${props => (props.color || 'initial')};
`

export const Bold = styled(Text)`
  font-weight: 600;
`

export const SmallText = styled(Text)`
  font-size: 0.8em;
  font-style: italic;
`

export const NoWrap = styled.div`
  white-space: nowrap;
`

export const BlueText: React.FC<PropsWithChildren<EmptyProps>> = (props) => {
  return <Text color={colors.baseBlue}>{props.children}</Text>
}
