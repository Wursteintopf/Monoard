import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseWithUserModel } from '../BaseWithUserModel'
import { TestUserModel } from './TestUserModel'

@Entity()
export class TestWithUserModel extends BaseWithUserModel {
  @Column()
    test: string

  @ManyToOne(() => TestUserModel, model => model.testModels, { cascade: true })
    user: TestUserModel
}
