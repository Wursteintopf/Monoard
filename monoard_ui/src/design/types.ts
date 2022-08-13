export type AvaiableColors = 'baseGreen' | 'lightBlue' | 'baseBlue' | 'darkBlue' | 'baseGrey' | 'middleGrey' | 'darkGrey' | 'white' | 'black' | 'signalYellow' | 'signalRed' 

export type RGB = `rgb(${number}, ${number}, ${number})`
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
export type HEX = `#${string}`
export type Color = RGB | RGBA | HEX

export type Size = `${number}${'px' | 'em' | '%'}`

export type Spacing = 'xs' | 's' | 'm' | 'l' | 'xl'
