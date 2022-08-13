import { CSVHeaderConfigModel } from './../models/CSVHeaderConfig/CSVHeaderConfigModel';
import { BudgetModel } from './../models/Budget/BudgetModel'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserModel } from '../models/User/UserModel'
import { BankAccountModel } from '../models/BankAccount/BankAccountModel'
import { MoneyMoveModel } from '../models/MoneyMove/MoneyMoveModel'

export const appDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.MYSQL_DATABASE_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [UserModel, BudgetModel, BankAccountModel, MoneyMoveModel, CSVHeaderConfigModel],
  migrations: [],
  subscribers: [],
})
