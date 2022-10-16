import moment from 'moment'
import { EntityNotFoundError } from 'typeorm'
import { BaseWithUserController } from './../BaseModel/BaseWithUserController'
import { YearModel } from './YearModel'

export class YearController extends BaseWithUserController<YearModel> {
  public async readActiveYear (userId: number): Promise<YearModel> {
    try {
      const yearModel = await this.repository.findOneOrFail({ where: { active: true, user: { id: userId } }, relations: ['user', 'budgets', 'moneyMoves'] })
      yearModel.set({ user: undefined })
      return yearModel
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        const year = moment().year()
        const yearModel = new YearModel().set({ year, active: true })
        this.repository.create(yearModel)
        return yearModel
      } else throw e
    }
  }

  public async deactivateYear (userId: number): Promise<void> {
    await this.repository.update({ active: true, user: { id: userId } }, { active: false })
  }

  public async activateYear (year: number, userId: number): Promise<void> {
    const yearModel = await this.readOneByOwn({ year }, userId)
    if (!yearModel) throw new EntityNotFoundError(YearModel, '')
    this.deactivateYear(userId)
    this.repository.update({ year, user: { id: userId } }, { active: true })
  }
}
