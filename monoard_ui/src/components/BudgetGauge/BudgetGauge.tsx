import styled from '@emotion/styled'
import React from 'react'
import { BudgetWithCalculatedAmount } from '../../data/MoneyMoves/MoneyMoveTypes'
import Gauge from '../../design/components/BaseVisualizations/Gauge'
import Box from '../../design/components/LayoutElements/Box'
import Flex from '../../design/components/LayoutElements/Flex'
import { Color } from '../../design/types'
import colors from '../../design/variables/colors'

interface BudgetGaugeProps {
  budget: BudgetWithCalculatedAmount
  color: Color
  onClick: () => void
}

const GaugeContainer = styled.div`
  position: absolute;
`

const StyledBudgetGauge = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  cursor: pointer;
`

const GaugeContent = styled.div`
  position: relative;
  z-index: 1;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CalculatedAmount = styled.div<{ overspent: boolean }>`
  font-size: 1.7em;
  font-weight: bold;
  ${props => props.overspent && `color: ${colors.signalRed};`}
`

const Amount = styled.div``

const BudgetName = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
`

const BudgetGauge: React.FC<BudgetGaugeProps> = ({
  budget,
  color,
  onClick,
}) => {
  const percentage = 50 // TODO: Fix this

  return (
    <Flex flexDirection='column'>
      <Box mb='s'>
        <BudgetName>{budget.name}</BudgetName>
      </Box>
      <StyledBudgetGauge onClick={onClick}>
        <GaugeContainer>
          <Gauge color={color} percentage={percentage} />
        </GaugeContainer>
        <GaugeContent>
          <CalculatedAmount overspent={percentage > 100}>
            {Math.abs(budget.calculatedAmount).toFixed(2)}€/
          </CalculatedAmount>
          <Amount>{Math.abs(1337).toFixed(2)}€</Amount>{/** TODO: Fix this */}
        </GaugeContent>
      </StyledBudgetGauge>
    </Flex>
  )
}

export default BudgetGauge
