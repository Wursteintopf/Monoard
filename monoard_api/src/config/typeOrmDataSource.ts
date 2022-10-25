import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { entities } from './entities'

export const appDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.MYSQL_DATABASE_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities,
  migrations: [],
  subscribers: [],
})
