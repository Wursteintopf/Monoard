import { getMockUsers } from './../../User/__mock__/mockUserData'
import { appDataSource } from '../../../config/typeOrmDataSource'
import { YearModel } from '../YearModel'

export const getMockYears = async () => {
  const repository = appDataSource.getRepository<YearModel>(YearModel)

  const { user } = await getMockUsers()

  const mockYears = {
    year1: new YearModel().set({
      id: 1,
      user,
      year: 1995,
      active: true,
    }),
    year2: new YearModel().set({
      id: 2,
      user,
      year: 1994,
      active: false,
    }),
  }

  await Promise.all(Object.values(mockYears).map(year => repository.save(year)))

  return mockYears
}
