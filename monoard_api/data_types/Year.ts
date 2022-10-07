import { Base } from './Base'
import { Month } from './Month'

export interface Year extends Base {
  year: number
  months?: Month[] | number[]
}
