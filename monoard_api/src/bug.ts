import Database from 'better-sqlite3'
import { appDataSource } from './config/__mocks__/typeOrmDataSource'
import { YearController } from './models/Year/YearController'
import { YearModel } from './models/Year/yearModel'

const testStuff = async () => {
  const testdb = new Database(':memory:', { verbose: console.log })
  await appDataSource.initialize()
  const repository = appDataSource.getRepository<YearModel>(YearModel)
  const controller = new YearController(YearModel)

  const year = new YearModel().set({
    year: 1996,
    active: true,
  })
  repository.save(year)

  const testYear = await controller.readOneByOwn({ year: 1996 }, 1)

  testYear.set({ active: false })
  repository.save(testYear)

  console.log(testYear)
}

testStuff()
