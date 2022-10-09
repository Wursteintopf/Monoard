import moment from 'moment'
import { EntityNotFoundError } from 'typeorm'
import { BaseWithUserController } from './../BaseModel/BaseWithUserController'
import { YearModel } from './YearModel'

export class YearController extends BaseWithUserController<YearModel> {
  public async getActiveYear (userId: number): Promise<YearModel> {
    try {
      const yearModel = await this.readOneByOwn({ active: true }, userId)
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
