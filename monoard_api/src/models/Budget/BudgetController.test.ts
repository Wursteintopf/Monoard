import { Repository } from 'typeorm'
import { appDataSource } from '../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { UserModel } from '../User/UserModel'
import { Role } from '../../../data_types/Role'
import { BudgetModel } from './BudgetModel'
import { BudgetController } from './BudgetController'

jest.mock('../../config/typeOrmDataSource')

describe('Test BudgetController', () => {
  let testdb: any
  let repository: Repository<BudgetModel>
  let controller: BudgetController

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()
    repository = appDataSource.getRepository<BudgetModel>(BudgetModel)
    const userRepository = appDataSource.getRepository<UserModel>(UserModel)
    controller = new BudgetController(BudgetModel)

    const user = new UserModel()
    user.id = 1
    user.username = 'user'
    user.password = 'password'
    user.role = Role.USER
    user.salt = 'salt'
    await userRepository.save(user)

    const model = new BudgetModel()
    model.user = user
    model.name = 'Budget1'
    model.slug = 'budget1'
    model.keywords = ''
    model.amount = 0

    await repository.save(model)

    const model2 = new BudgetModel()
    model2.user = user
    model2.name = 'Budget2'
    model2.slug = 'budget2'
    model2.keywords = ''
    model2.amount = 0

    await repository.save(model2)
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('placeholder test', () => {
    expect(1).toEqual(1)
  })
})
