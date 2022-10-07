import { MoneyMoveModel } from '../MoneyMoveModel'
import { MoneyMove } from '../../../../data_types/MoneyMove'

export const mockMoneyMoves: MoneyMove[] = [
  {
    date: new Date('1995-02-24T00:00:00'),
    amount: 0,
    foreignBankAccount: 'account1',
    foreignBankAccountIban: 'account1',
    purpose: 'purpose',
    isInternalMove: false,
  },
  {
    date: new Date('1995-03-24T00:00:00'),
    amount: -13,
    foreignBankAccount: 'PayPal',
    foreignBankAccountIban: 'account2',
    purpose: 'purpose2',
    isInternalMove: false,
  },
  {
    date: new Date('1995-02-24T00:00:00'),
    amount: 42,
    foreignBankAccount: '',
    foreignBankAccountIban: '',
    purpose: 'purpose3',
    isInternalMove: true,
  },
]

export const getMockMoneyMoveModels = (): MoneyMoveModel[] => {
  return mockMoneyMoves.map(m => new MoneyMoveModel().set(m))
}
