import { CSVHeaderConfig } from './CSVHeaderConfig'
import { Base } from './Base'
import { User } from './User'

export interface BankAccount extends Base {
  name: string
  slug: string
  balance: number
  iban: string
  paypalType: boolean
  user?: User | number
  connectedBankAccount?: BankAccount | number
  csvHeaderConfig?: CSVHeaderConfig
}

export const EMPTY_BANKACCOUNT: BankAccount = {
  id: -1,
  name: '',
  slug: '',
  balance: 0,
  iban: '',
  paypalType: false,
}
