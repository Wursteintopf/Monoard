import { BaseWithUserController } from '../BaseWithUserController'
import { Repository, EntityNotFoundError } from 'typeorm'
import { appDataSource } from '../../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { TestWithUserModel } from '../__mock__/TestWithUserModel'
import { TestUserModel } from '../__mock__/TestUserModel'

jest.mock('../../../config/typeOrmDataSource')

describe('Test BaseWithUserController', () => {
  let testdb: any
  let repository: Repository<TestWithUserModel>
  let controller: BaseWithUserController<TestWithUserModel>

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()
    repository = appDataSource.getRepository<TestWithUserModel>(TestWithUserModel)
    controller = new BaseWithUserController<TestWithUserModel>(TestWithUserModel)

    const user1 = new TestUserModel()
    user1.id = 1
    const user2 = new TestUserModel()
    user2.id = 2

    const model = new TestWithUserModel()
    model.id = 1
    model.test = 'test1'
    model.user = user1
    await repository.save(model)

    const model2 = new TestWithUserModel()
    model2.id = 2
    model2.test = 'test2'
    model2.user = user1
    await repository.save(model2)

    const model3 = new TestWithUserModel()
    model3.id = 3
    model3.test = 'test3'
    model3.user = user2
    await repository.save(model3)
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('should create a model related to a user', async () => {
    await controller.createOwn({ test: 'somecontent' }, 1)
    const models = await repository.find()
    expect(models.length).toEqual(4)
  })

  it('should create multiple models related to a user', async () => {
    await controller.createMultipleOwn([{ test: 'somecontent' }, { test: 'morecontent' }], 1)
    const models = await repository.find()
    expect(models.length).toEqual(5)
  })

  it('should read a model related to a user', async () => {
    const found = await controller.readOwn(1, 1)
    expect(found.id).toBe(1)
    expect(found.test).toBe('test1')
  })

  it('should not read a model related to another user', async () => {
    await expect(controller.readOwn(3, 1)).rejects.toThrow(EntityNotFoundError)
  })

  it('should read all models of a user', async () => {
    const found = await controller.readAllOwn(1)
    expect(found.length).toBe(2)
  })

  it('should read all models of a user by an id', async () => {
    const found = await controller.readByOwn({ id: 1 }, 1)
    expect(found.length).toBe(1)
  })

  it('should read a model of a user by its id', async () => {
    const found = await controller.readOneByOwn({ id: 1 }, 1)
    expect(found.id).toBe(1)
  })

  it('should update a model related to a uer', async () => {
    await controller.updateOwn({ id: 1, test: 'changed' }, 1)
    const found = await repository.findOneBy({ id: 1, user: { id: 1 } })
    expect(found?.id).toBe(1)
    expect(found?.test).toBe('changed')
  })

  it('should delete a model', async () => {
    await controller.deleteOwn(1, 1)
    const models = await repository.find()
    expect(models.length).toBe(2)
  })
})
