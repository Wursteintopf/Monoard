import React from 'react'
import { Color } from '../../types'
import { scaleLinear } from 'd3-scale'

interface BarProps {
  color: Color
  max: number
  thisMax: number
  amount: number
}

const Bar: React.FC<BarProps> = ({ color, max, thisMax, amount }) => {
  const scale = scaleLinear().domain([0, max]).range([0, 600])

  return (
    <svg viewBox='0 0 600 15'>
      <rect x='0' y='0' height='100' width={scale(thisMax)} fill={color} opacity='0.3' />
      <rect x='0' y='0' height='100' width={scale(amount)} fill={color} />
    </svg>
  )
}

export default Bar
