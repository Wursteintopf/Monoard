import { Year } from './Year'
import { BankAccount } from './BankAccount'
import { Base } from './Base'
import { Budget } from './Budget'
import { User } from './User'
import { Month } from './Month'

export interface MoneyMove extends Base {
  date: Date
  month: Month
  foreignBankAccount: string
  foreignBankAccountIban: string
  purpose: string
  amount: number
  isInternalMove: boolean
  manualBudget?: Budget | number
  bankAccount?: BankAccount | number
  year?: Year | number
  user?: User | number
}
