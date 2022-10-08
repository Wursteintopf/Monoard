import { Year } from './Year'
import { BankAccount } from './BankAccount'
import { Base } from './Base'
import { Budget } from './Budget'
import { User } from './User'

export interface MoneyMove extends Base {
  date: Date
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
