import { CSVHeaderConfig } from './CSVHeaderConfig'
import { Base } from './Base'

export interface BankAccount extends Base {
  name: string
  slug: string
  balance: number
  iban: string
  paypalType: boolean
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
