import styled from '@emotion/styled'
import React from 'react'
import Bar from '../../design/components/BaseVisualizations/Bar'
import Box from '../../design/components/LayoutElements/Box'
import Flex from '../../design/components/LayoutElements/Flex'
import { Color } from '../../design/types'
import colors from '../../design/variables/colors'

interface BudgetGaugeProps {
  label: string
  max: number
  thisMax: number
  amount: number
  color: Color
  onClick?: () => void
}

const BarContainer = styled.div`
  position: absolute;
  width: 100%;
`

const StyledIncomeBar = styled.div<{ onClick?: () => void }>`
  width: 100%;
  height: 40px;
  position: relative;
  ${props => props.onClick && 'cursor: pointer;'};
`

const BarContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 33px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-left: 10px;
`

const CalculatedAmount = styled.div<{ overspent: boolean }>`
  font-size: 1.1em;
  font-weight: bold;
  ${props => props.overspent && `color: ${colors.signalRed};`}
`

const Amount = styled.div`
  font-size: 0.9em;
  margin-left: 5px;
`

const BudgetName = styled.div`
  width: 100%;
  font-weight: bold;
`

const MoneyBar: React.FC<BudgetGaugeProps> = ({
  label,
  max,
  thisMax,
  amount,
  color,
  onClick,
}) => {
  return (
    <Flex alignItems='center'>
      <Box width='200px'>
        <BudgetName>{label}</BudgetName>
      </Box>
      <StyledIncomeBar onClick={onClick}>
        <BarContainer>
          <Bar color={color} max={max} thisMax={thisMax} amount={amount} />
        </BarContainer>
        <BarContent>
          <CalculatedAmount overspent={amount > thisMax}>
            {Math.abs(amount).toFixed(2)}€
          </CalculatedAmount>
          <Amount>/ {Math.abs(thisMax).toFixed(2)}€</Amount>
        </BarContent>
      </StyledIncomeBar>
    </Flex>
  )
}

export default MoneyBar
