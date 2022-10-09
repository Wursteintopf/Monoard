import { Repository } from 'typeorm'
import { appDataSource } from '../../../config/typeOrmDataSource'
import Database from 'better-sqlite3'
import { YearModel } from '../YearModel'
import { YearController } from '../YearController'
import { getMockYears } from '../__mock__/mockYearData'
import moment from 'moment'

jest.mock('../../../config/typeOrmDataSource')

describe('Test BudgetController', () => {
  let testdb: any
  let repository: Repository<YearModel>
  let controller: YearController

  beforeEach(async () => {
    testdb = new Database(':memory:', { verbose: console.log })
    await appDataSource.initialize()
    repository = appDataSource.getRepository<YearModel>(YearModel)
    controller = new YearController(YearModel)

    await getMockYears()
  })

  afterEach(async () => {
    testdb.close()
    appDataSource.destroy()
  })

  it('should return the active year', async () => {
    const activeYear = await controller.getActiveYear(1)
    expect(activeYear.year).toBe(1995)
  })

  it('should create and return the current year as active, if there is no other active year', async () => {
    await controller.deactivateYear(1)
    const activeYear = await controller.getActiveYear(1)
    expect(activeYear.year).toBe(moment().year())
  })

  it('should deactivate a year', async () => {
    await controller.deactivateYear(1)
    const year = await controller.readOneByOwn({ year: 1995 }, 1)
    expect(year.active).toBe(false)
  })

  it('should activate a year and deactive the previously active one', async () => {
    await controller.activateYear(1994, 1)
    const year = await controller.readOneByOwn({ year: 1994 }, 1)
    const oldyear = await controller.readOneByOwn({ year: 1995 }, 1)
    expect(year.active).toBe(true)
    expect(oldyear.active).toBe(false)
  })
})
