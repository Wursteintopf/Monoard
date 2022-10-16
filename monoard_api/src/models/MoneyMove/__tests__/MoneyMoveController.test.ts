import { Repository } from 'typeorm'
import { appDataSource } from '../../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { MoneyMoveModel } from '../MoneyMoveModel'
import { MoneyMoveController } from '../MoneyMoveController'
import { BankAccountModel } from '../../BankAccount/BankAccountModel'
import { getMockMoneyMoves } from '../__mock__/mockMoneyMoveData'
import { getMockYears } from '../../Year/__mock__/mockYearData'

jest.mock('../../../config/typeOrmDataSource')

describe('Test MoneyMoveController', () => {
  let testdb: any
  let repository: Repository<MoneyMoveModel>
  let controller: MoneyMoveController

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()

    repository = appDataSource.getRepository<MoneyMoveModel>(MoneyMoveModel)
    controller = new MoneyMoveController(MoneyMoveModel)
    await getMockMoneyMoves()
    await getMockYears()
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('should not overwrite an existing moneymove', async () => {
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
    expect(created?.isInternalMove).toBe(true)
  })

  it('should update the balance of a bankaccount if moneymoves are added', async () => {
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
    const bankAccountRepository =
      appDataSource.getRepository<BankAccountModel>(BankAccountModel)
    const bankAccount = await bankAccountRepository.findOne({ where: { id: 1 } })
    expect(bankAccount?.balance).toEqual(-42)
  })

  it('should only add moneymoves within the active year', async () => {
    await controller.createMultipleOwn(
      [
        {
          amount: -42,
          date: new Date('1996-02-24T00:00:00'),
          foreignBankAccount: 'PayPal',
          foreignBankAccountIban: '',
          purpose: 'somepurpose',
          isInternalMove: false,
          bankAccount: 1 as unknown as BankAccountModel,
        },
        {
          amount: -1337,
          date: new Date('1995-02-24T00:00:00'),
          foreignBankAccount: 'PayPal',
          foreignBankAccountIban: '',
          purpose: 'searchpurpose',
          isInternalMove: false,
          bankAccount: 1 as unknown as BankAccountModel,
        },
      ],
      1,
    )
    const models = await repository.find()
    expect(models.length).toEqual(4)

    const newModel = await repository.findOneOrFail({ where: { purpose: 'searchpurpose' }, relations: ['year'] })
    expect(newModel.year.active).toBe(true)
  })
})
