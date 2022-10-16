import { appDataSource } from '../../../config/typeOrmDataSource'
import { getMockUsers } from '../../User/__mock__/mockUserData'
import { BudgetModel } from '../BudgetModel'

export const getMockBudgets = async () => {
  const repository = appDataSource.getRepository<BudgetModel>(BudgetModel)

  const { user } = await getMockUsers()

  const budget1 = new BudgetModel().set({
    user,
    name: 'Budget1',
    slug: 'budget1',
    keywords: '',
    isIncome: false,
    base: 0,
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  })

  const budget2 = new BudgetModel().set({
    user,
    name: 'Budget2',
    slug: 'budget2',
    keywords: '',
    isIncome: false,
    base: 0,
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  })

  await repository.save([budget1, budget2])

  return {
    budget1,
    budget2,
  }
}
