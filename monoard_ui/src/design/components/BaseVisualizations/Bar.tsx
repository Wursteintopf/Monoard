import React from 'react'
import { Color } from '../../types'
import { scaleLinear } from 'd3-scale'

interface BarProps {
  color: Color
  percentage: number
}

const Bar: React.FC<BarProps> = ({ color, percentage }) => {
  const scale = scaleLinear().domain([0, 100]).range([0, 600])

  return (
    <svg viewBox='0 0 600 70'>
      <rect x='0' y='0' height='100' width='600' fill={color} opacity='0.3' />
      <rect x='0' y='0' height='100' width={scale(percentage)} fill={color} />
    </svg>
  )
}

export default Bar
