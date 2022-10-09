import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { TestModel } from '../../models/BaseModel/__mock__/TestModel'
import { TestWithUserModel } from '../../models/BaseModel/__mock__/TestWithUserModel'
import { TestUserModel } from '../../models/BaseModel/__mock__/TestUserModel'
import { entities } from '../entities'

export const appDataSource = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [TestModel, TestUserModel, TestWithUserModel, ...entities],
  migrations: [],
  subscribers: [],
})
