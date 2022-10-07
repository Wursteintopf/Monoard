import { getMockBankAccounts } from './../__mock__/mockBankAccountData'
import { BankAccountController } from '../BankAccountController'
import { appDataSource } from '../../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { BankAccountModel } from '../BankAccountModel'

jest.mock('../../../config/typeOrmDataSource')

describe('Test MoneyMoveController', () => {
  let testdb: any
  let controller: BankAccountController

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()
    controller = new BankAccountController(BankAccountModel)

    await getMockBankAccounts()
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('should load all used slugs by a user', async () => {
    const slugs = await controller.readUsedSlugs(1)
    expect(slugs).toEqual(['slug', 'slug2'])
  })

  it('should load all ibans by a user', async () => {
    const ibans = await controller.readAllIBans(1)
    expect(ibans).toEqual(['bankaccount'])
  })
})
