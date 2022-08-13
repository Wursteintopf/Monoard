import React from 'react'
import { Color } from '../../types'
import { scaleLinear } from 'd3-scale'
import { arcPath } from '../../../utils/d3Utils'

interface GaugeProps {
  color: Color
  percentage: number
}

const Gauge: React.FC<GaugeProps> = ({ color, percentage }) => {
  const correctedPercentage = percentage > 100 ? 100 : (percentage < 0 ? 0 : percentage)
  const scaleToCircle = scaleLinear().domain([0, 100]).range([-90, 270])
  const RADIUS_INNER = 80
  const RADIUS_OUTER = 100

  return (
    <svg viewBox='-100 -100 200 200'>
      <path d={arcPath(RADIUS_INNER, RADIUS_OUTER, scaleToCircle(0), scaleToCircle(50))} fill={color} opacity='0.3' />
      <path d={arcPath(RADIUS_INNER, RADIUS_OUTER, scaleToCircle(50), scaleToCircle(100))} fill={color} opacity='0.3' />
      <path d={arcPath(RADIUS_INNER, RADIUS_OUTER, scaleToCircle(0), scaleToCircle(correctedPercentage < 50 ? correctedPercentage : 50))} fill={color} />
      {percentage > 50 && <path d={arcPath(RADIUS_INNER, RADIUS_OUTER, scaleToCircle(50), scaleToCircle(correctedPercentage))} fill={color} />}
    </svg>
  )
}

export default Gauge
