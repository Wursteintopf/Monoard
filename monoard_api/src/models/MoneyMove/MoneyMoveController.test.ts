import { Repository } from 'typeorm'
import { appDataSource } from '../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { MoneyMoveModel } from './MoneyMoveModel'
import { MoneyMoveController } from './MoneyMoveController'
import { UserModel } from '../User/UserModel'
import { BankAccountModel } from '../BankAccount/BankAccountModel'
import { Role } from '../../../data_types/Role'

jest.mock('../../config/typeOrmDataSource')

describe('Test MoneyMoveController', () => {
  let testdb: any
  let repository: Repository<MoneyMoveModel>
  let controller: MoneyMoveController

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()
    repository = appDataSource.getRepository<MoneyMoveModel>(MoneyMoveModel)
    const userRepository = appDataSource.getRepository<UserModel>(UserModel)
    const bankAccountRepository =
      appDataSource.getRepository<BankAccountModel>(BankAccountModel)
    controller = new MoneyMoveController(MoneyMoveModel)

    const user = new UserModel()
    user.id = 1
    user.username = 'user'
    user.password = 'password'
    user.role = Role.USER
    user.salt = 'salt'
    await userRepository.save(user)

    const bankAccount = new BankAccountModel()
    bankAccount.id = 1
    bankAccount.balance = 0
    bankAccount.iban = 'bankaccount'
    bankAccount.name = 'name'
    bankAccount.paypalType = false
    bankAccount.slug = 'slug'
    bankAccount.user = user
    await bankAccountRepository.save(bankAccount)

    const paypalAccount = new BankAccountModel()
    paypalAccount.id = 2
    paypalAccount.balance = 0
    paypalAccount.iban = 'paypal'
    paypalAccount.name = 'paypal'
    paypalAccount.paypalType = true
    paypalAccount.slug = 'slug2'
    paypalAccount.user = user
    paypalAccount.connectedBankAccount = bankAccount
    await bankAccountRepository.save(paypalAccount)

    const model = new MoneyMoveModel()
    model.user = user
    model.date = new Date('1995-02-24T00:00:00')
    model.bankAccount = bankAccount
    model.amount = 0
    model.foreignBankAccount = 'account1'
    model.foreignBankAccountIban = 'account1'
    model.purpose = 'purpose'
    model.isInternalMove = false
    await repository.save(model)

    const model2 = new MoneyMoveModel()
    model2.user = user
    model2.date = new Date('1995-03-24T00:00:00')
    model2.bankAccount = bankAccount
    model2.amount = -13
    model2.foreignBankAccount = 'PayPal'
    model2.foreignBankAccountIban = 'account2'
    model2.purpose = 'purpose2'
    model2.isInternalMove = false
    await repository.save(model2)

    const paypalModel = new MoneyMoveModel()
    paypalModel.user = user
    paypalModel.date = new Date('1995-02-24T00:00:00')
    paypalModel.bankAccount = paypalAccount
    paypalModel.amount = 42
    paypalModel.foreignBankAccount = ''
    paypalModel.foreignBankAccountIban = ''
    paypalModel.purpose = 'purpose3'
    paypalModel.isInternalMove = true
    await repository.save(paypalModel)
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('should not override an existing moneymove', async () => {
    await controller.createMultipleOwn(
      [
        {
          amount: 0,
          date: new Date('1995-02-24T00:00:00'),
          foreignBankAccount: 'account1',
          foreignBankAccountIban: 'account1',
          purpose: 'purpose',
          isInternalMove: false,
          bankAccount: 1 as unknown as BankAccountModel,
        },
        {
          amount: 2,
          date: new Date('1995-02-24T00:00:00'),
          foreignBankAccount: 'account3',
          foreignBankAccountIban: 'account3',
          purpose: 'purpose3',
          isInternalMove: false,
          bankAccount: 1 as unknown as BankAccountModel,
        },
      ],
      1,
    )
    const models = await repository.find()
    expect(models.length).toEqual(4)
  })

  it('should only load moneymoves in a specific range', async () => {
    const models = await controller.readByBankAccountInRange('slug', 1, new Date('1995-02-01T00:00:00'), new Date('1995-03-01T00:00:00'))
    expect(models.length).toEqual(1)
    expect(models[0].foreignBankAccount).toEqual('account1')
  })

  it('should mark a related move as internal, if there is a related move on a bankaccount', async () => {
    await controller.createMultipleOwn(
      [
        {
          amount: 13,
          date: new Date('1995-03-24T00:00:00'),
          foreignBankAccount: '',
          foreignBankAccountIban: '',
          purpose: '',
          isInternalMove: true,
          bankAccount: 2 as unknown as BankAccountModel,
        },
      ],
      1,
    )
    const updated = await repository.findOne({ where: { foreignBankAccount: 'PayPal' } })
    expect(updated?.isInternalMove).toBe(true)
  })

  it('should mark a move as internal, if there is a related move on a paypal account', async () => {
    await controller.createMultipleOwn(
      [
        {
          amount: -42,
          date: new Date('1995-02-24T00:00:00'),
          foreignBankAccount: 'PayPal',
          foreignBankAccountIban: '',
          purpose: 'somepurpose',
          isInternalMove: false,
          bankAccount: 1 as unknown as BankAccountModel,
        },
      ],
      1,
    )
    const created = await repository.findOne({ where: { purpose: 'somepurpose' } })
    console.log(created)
    expect(created?.isInternalMove).toBe(true)
  })
})
