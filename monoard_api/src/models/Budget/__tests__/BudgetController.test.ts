import { getMockBudgets } from './../__mock__/mockBudgetData'
import { Repository } from 'typeorm'
import { appDataSource } from '../../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { BudgetModel } from '../BudgetModel'
import { BudgetController } from '../BudgetController'

jest.mock('../../../config/typeOrmDataSource')

describe('Test BudgetController', () => {
  let testdb: any
  let repository: Repository<BudgetModel>
  let controller: BudgetController

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()
    repository = appDataSource.getRepository<BudgetModel>(BudgetModel)
    controller = new BudgetController(BudgetModel)

    await getMockBudgets()
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('placeholder test', () => {
    expect(1).toEqual(1)
  })
})
