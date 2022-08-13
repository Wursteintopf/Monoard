import { Entity } from 'typeorm'
import { BaseModel } from './BaseModel'
import { BaseUserModel } from './BaseUserModel'

@Entity()
export class BaseWithUserModel extends BaseModel {
  user?: BaseUserModel
}
