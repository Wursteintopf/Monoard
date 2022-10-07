import { getMockUsers } from './../../User/__mock__/mockUserData'
import { appDataSource } from '../../../config/typeOrmDataSource'
import { MoneyMoveModel } from '../MoneyMoveModel'
import { getMockBankAccounts } from '../../BankAccount/__mock__/mockBankAccountData'

export const getMockMoneyMoves = async () => {
  const repository = appDataSource.getRepository<MoneyMoveModel>(MoneyMoveModel)

  const { user } = await getMockUsers()
  const { bankAccount, paypalAccount } = await getMockBankAccounts()

  const mockMoneyMoves = {
    mockMoneyMove1: new MoneyMoveModel().set({
      user,
      bankAccount,
      date: new Date('1995-02-24T00:00:00'),
      amount: 0,
      foreignBankAccount: 'account1',
      foreignBankAccountIban: 'account1',
      purpose: 'purpose',
      isInternalMove: false,
    }),
    mockMoneyMove2: new MoneyMoveModel().set({
      user,
      bankAccount,
      date: new Date('1995-03-24T00:00:00'),
      amount: -13,
      foreignBankAccount: 'PayPal',
      foreignBankAccountIban: 'account2',
      purpose: 'purpose2',
      isInternalMove: false,
    }),
    mockPayPalMove: new MoneyMoveModel().set({
      user,
      bankAccount: paypalAccount,
      date: new Date('1995-02-24T00:00:00'),
      amount: 42,
      foreignBankAccount: '',
      foreignBankAccountIban: '',
      purpose: 'purpose3',
      isInternalMove: true,
    }),
  }

  await Promise.all(Object.values(mockMoneyMoves).map(moneyMove => repository.save(moneyMove)))

  return mockMoneyMoves
}
