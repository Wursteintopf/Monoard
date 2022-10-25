import { AvaiableColors, Color } from '../types'

type ColorArray = Record<AvaiableColors, Color> & Record<'variousColors', Color[]>

const colors: ColorArray = {
  baseGreen: '#009843',
  lightBlue: '#79a3b9',
  baseBlue: '#00537C',
  darkBlue: '#004264',
  baseGrey: '#F1F1F1',
  lightGrey: '#d0d0d0',
  middleGrey: '#cccccc',
  darkGrey: '#8b8989',
  veryDarkGrey: '#444444',
  white: '#FFFFFF',
  black: '#000000',
  signalYellow: '#D2D621',
  signalRed: '#ad2525',
  variousColors: [
    '#FF7E6B',
    '#faca2c',
    '#A5BE00',
    '#5BC0EB',
    '#9BC53D',
    '#C3423F',
    '#EFF1F3',
    '#D77A61',
    '#0CCA4A',
  ],
}

export default colors
