import { BaseModel } from '@wursteintopf/crudpress'
import { Entity } from 'typeorm'
import { BaseUserModel } from './BaseUserModel'

@Entity()
export class BaseWithUserModel extends BaseModel {
  user?: BaseUserModel
}
