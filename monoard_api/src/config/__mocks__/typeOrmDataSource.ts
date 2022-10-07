import { CSVHeaderConfigModel } from './../../models/CSVHeaderConfig/CSVHeaderConfigModel'
import { BudgetModel } from './../../models/Budget/BudgetModel'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserModel } from '../../models/User/UserModel'
import { BankAccountModel } from '../../models/BankAccount/BankAccountModel'
import { MoneyMoveModel } from '../../models/MoneyMove/MoneyMoveModel'
import { TestModel } from '../../models/BaseModel/__mock__/TestModel'
import { TestWithUserModel } from '../../models/BaseModel/__mock__/TestWithUserModel'
import { TestUserModel } from '../../models/BaseModel/__mock__/TestUserModel'

export const appDataSource = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [TestModel, TestUserModel, TestWithUserModel, UserModel, BudgetModel, BankAccountModel, MoneyMoveModel, CSVHeaderConfigModel],
  migrations: [],
  subscribers: [],
})
