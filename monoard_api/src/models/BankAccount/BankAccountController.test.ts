import { BankAccountController } from './BankAccountController'
import { Repository } from 'typeorm'
import { appDataSource } from '../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { UserModel } from '../User/UserModel'
import { BankAccountModel } from '../BankAccount/BankAccountModel'
import { Role } from '../../../data_types/Role'

jest.mock('../../config/typeOrmDataSource')

describe('Test MoneyMoveController', () => {
  let testdb: any
  let repository: Repository<BankAccountModel>
  let controller: BankAccountController

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()
    repository = appDataSource.getRepository<BankAccountModel>(BankAccountModel)
    const userRepository = appDataSource.getRepository<UserModel>(UserModel)
    controller = new BankAccountController(BankAccountModel)

    const user = new UserModel()
    user.id = 1
    user.username = 'user'
    user.password = 'password'
    user.role = Role.USER
    user.salt = 'salt'
    await userRepository.save(user)

    const model = new BankAccountModel()
    model.id = 1
    model.balance = 0
    model.iban = 'iban1'
    model.name = 'name'
    model.paypalType = false
    model.slug = 'slug'
    model.user = user

    await repository.save(model)
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('should load all used slugs by a user', async () => {
    const slugs = await controller.readUsedSlugs(1)
    expect(slugs).toEqual(['slug'])
  })

  it('should load all ibans by a user', async () => {
    const ibans = await controller.readAllIBans(1)
    expect(ibans).toEqual(['iban1'])
  })
})
