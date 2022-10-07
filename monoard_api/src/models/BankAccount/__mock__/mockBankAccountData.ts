import { appDataSource } from '../../../config/typeOrmDataSource'
import { getMockUsers } from '../../User/__mock__/mockUserData'
import { BankAccountModel } from '../BankAccountModel'

export const getMockBankAccounts = async () => {
  const repository = appDataSource.getRepository<BankAccountModel>(BankAccountModel)

  const { user } = await getMockUsers()

  const bankAccount = new BankAccountModel().set({
    id: 1,
    user,
    balance: 0,
    iban: 'bankaccount',
    name: 'name',
    paypalType: false,
    slug: 'slug',
  })

  const paypalAccount = new BankAccountModel().set({
    id: 2,
    user,
    balance: 0,
    iban: 'paypal',
    name: 'paypal',
    paypalType: true,
    slug: 'slug2',
    connectedBankAccount: bankAccount,
  })

  const mockBankAccounts = {
    bankAccount,
    paypalAccount,
  }

  await repository.save(bankAccount)
  await repository.save(paypalAccount)

  return mockBankAccounts
}
