import { moneyMoveRouter } from './models/MoneyMove/MoneyMoveRouter'
import { budgetRouter } from './models/Budget/BudgetRouter'
import { userRouter } from './models/User/UserRouter'
import { Role } from '../data_types/Role'
import { appDataSource } from './config/typeOrmDataSource'
import { corsConfig } from './config/corsConfig'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import session from 'express-session'
import * as http from 'http'
import { connection } from './config/databaseConnection'
import { bankAccountRouter } from './models/BankAccount/BankAccountRouter'

declare module 'express-session' {
  export interface SessionData {
    role: Role
    username: string
    userId: number
  }
}

const startApi = async () => {
  // Initialize TypeORM
  await appDataSource.initialize().catch(e => console.log(e))

  // Initialize Express and Server
  const app = express()
  const server = http.createServer(app)

  // Configure Express
  app.use(cors(corsConfig))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('dev'))

  // Add Express Session
  const MySQLStore = require('express-mysql-session')(session)
  const sessionStore = new MySQLStore({}, connection)
  const mySession = session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    name: 'monoard',
    store: sessionStore,
    cookie: {
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
  })
  app.use(mySession)

  // Configure Routes
  app.get('/', (req, res) => res.send('API is up and running.'))
  app.use('/user', userRouter())
  app.use('/bankAccount', bankAccountRouter())
  app.use('/budget', budgetRouter())
  app.use('/moneyMove', moneyMoveRouter())

  // Start server
  server.listen(3001, () => {
    console.log('Listening on port 3001.')
  })
}

startApi()
