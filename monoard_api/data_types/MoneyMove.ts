import { BankAccount } from './BankAccount'
import { Base } from './Base'
import { Budget } from './Budget'

export interface MoneyMove extends Base {
  date: Date
  foreignBankAccount: string
  foreignBankAccountIban: string
  purpose: string
  amount: number
  isInternalMove: boolean
  manualBudget?: Budget | number
  bankAccount?: BankAccount | number
}
