import { BudgetModel } from './BudgetModel'
import { BaseWithUserController } from './../BaseModel/BaseWithUserController'
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import moment from 'moment'

export class BudgetController extends BaseWithUserController<BudgetModel> {
  public async readInMonth (
    userId: number,
    month: Date,
  ): Promise<BudgetModel[]> {
    const budgets = await this.repository.find({
      where: {
        user: { id: userId },
        startMonth: LessThanOrEqual(moment(month).endOf('month').toDate()),
        endMonth: MoreThanOrEqual(moment(month).startOf('month').toDate()),
      },
      relations: ['user'],
    })
    return budgets.map(m => {
      m.user = undefined
      m.amount = Number(m.amount)
      return m
    })
  }
}
