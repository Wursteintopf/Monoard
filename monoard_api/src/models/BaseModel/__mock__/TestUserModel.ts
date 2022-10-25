import { Entity, OneToMany } from 'typeorm'
import { BaseUserModel } from '../BaseUserModel'
import { TestWithUserModel } from './TestWithUserModel'

@Entity()
export class TestUserModel extends BaseUserModel {
  @OneToMany(() => TestWithUserModel, model => model.user)
    testModels: TestWithUserModel
}
