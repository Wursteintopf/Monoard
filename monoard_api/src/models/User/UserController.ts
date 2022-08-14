import { BaseController } from '../BaseModel/BaseController'
import { UserModel } from './UserModel'

export class UserController extends BaseController<UserModel> {
  public getLength = async (): Promise<number> => {
    const all = await this.repository.find()
    return all.length
  }
}
