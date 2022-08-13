import styled from '@emotion/styled'
import React from 'react'
import { BudgetWithCalculatedAmount } from '../../data/MoneyMoves/MoneyMoveTypes'
import Bar from '../../design/components/BaseVisualizations/Bar'
import Box from '../../design/components/LayoutElements/Box'
import Flex from '../../design/components/LayoutElements/Flex'
import { Color } from '../../design/types'
import colors from '../../design/variables/colors'

interface BudgetGaugeProps {
  budget: BudgetWithCalculatedAmount
  color: Color
  onClick: () => void
}

const BarContainer = styled.div`
  position: absolute;
`

const StyledIncomeBar = styled.div`
  width: 400px;
  height: 50px;
  position: relative;
  cursor: pointer;
`

const BarContent = styled.div`
  position: relative;
  z-index: 1;
  width: 400px;
  height: 42px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-left: 10px;
`

const CalculatedAmount = styled.div<{ overspent: boolean }>`
  font-size: 1.5em;
  font-weight: bold;
  ${props => props.overspent && `color: ${colors.signalRed};`}
`

const Amount = styled.div`
  font-size: 1.2em;
`

const BudgetName = styled.div`
  width: 100%;
  font-weight: bold;
`

const IncomeBar: React.FC<BudgetGaugeProps> = ({
  budget,
  color,
  onClick,
}) => {
  const percentage = (budget.calculatedAmount / budget.amount) * 100

  return (
    <Flex flexDirection='column'>
      <Box mb='s'>
        <BudgetName>{budget.name}</BudgetName>
      </Box>
      <StyledIncomeBar onClick={onClick}>
        <BarContainer>
          <Bar color={color} percentage={percentage} />
        </BarContainer>
        <BarContent>
          <CalculatedAmount overspent={percentage > 100}>
            {Math.abs(budget.calculatedAmount).toFixed(2)}€/
          </CalculatedAmount>
          <Amount>{Math.abs(budget.amount).toFixed(2)}€</Amount>
        </BarContent>
      </StyledIncomeBar>
    </Flex>
  )
}

export default IncomeBar
