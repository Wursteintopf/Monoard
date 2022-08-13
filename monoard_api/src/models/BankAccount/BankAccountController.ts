import { BankAccountModel } from './BankAccountModel'
import { BaseWithUserController } from './../BaseModel/BaseWithUserController'
import { Nullable } from '../../../data_types/UtilTypes'
import { EntityNotFoundError } from 'typeorm'

export class BankAccountController extends BaseWithUserController<BankAccountModel> {
  public async readUsedSlugs (userId: number): Promise<string[]> {
    const accounts = await this.repository.find({ where: { user: { id: userId } }, relations: ['user'] })
    return accounts.map(a => a.slug)
  }

  public async readAllIBans (userId: number): Promise<string[]> {
    const accounts = await this.repository.find({ where: { user: { id: userId } }, relations: ['user'] })
    return accounts.filter(a => !a.paypalType).map(a => a.iban)
  }

  public async readOneByOwn (params: Nullable<BankAccountModel>, userId: number): Promise<BankAccountModel> {
    const model = await this.repository.findOne({ where: { user: { id: userId }, ...params } as any, relations: ['user', 'csvHeaderConfig', 'connectedBankAccount', 'connectedPayPalAccount'] })
    if (!model) throw new EntityNotFoundError(this.ModelConstructor, '')
    model.user = undefined
    return model
  }
}
