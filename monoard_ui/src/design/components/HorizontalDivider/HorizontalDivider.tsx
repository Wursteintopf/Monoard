import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import colors from '../../variables/colors'

interface HorizontalDividerProps {}

const StyledHorizontalDivider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-right: 1px solid ${colors.middleGrey};
  padding: 0 20px;

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    border-right: none;
    padding-right: 0;
  }
`

export const HorizontalDivider: React.FC<PropsWithChildren<HorizontalDividerProps>> = ({ children }) => {
  return (
    <StyledHorizontalDivider>{children}</StyledHorizontalDivider>
  )
}

const StyledHorizontalDividerWrapper = styled.div`
  display: flex;
`

export const HorizontalDividerWrapper: React.FC<PropsWithChildren<HorizontalDividerProps>> = ({ children }) => {
  return (
    <StyledHorizontalDividerWrapper>{children}</StyledHorizontalDividerWrapper>
  )
}
