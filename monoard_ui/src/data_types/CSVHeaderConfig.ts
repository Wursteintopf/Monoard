import { Base } from './Base'

export interface CSVHeaderConfig extends Base {
  date: string
  dateFormat: string
  foreignBankAccount: string
  foreignBankAccountIban: string
  purpose: string
  amount: string
}
