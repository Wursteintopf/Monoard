import { BudgetModel } from './BudgetModel'
import { BaseWithUserController } from './../BaseModel/BaseWithUserController'

export class BudgetController extends BaseWithUserController<BudgetModel> {
  public async readUsedSlugs (userId: number): Promise<string[]> {
    const budgets = await this.repository.find({ where: { user: { id: userId } }, relations: ['user'] })
    return budgets.map(a => a.slug)
  }
}
