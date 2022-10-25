import { BankAccountModel } from '../models/BankAccount/BankAccountModel'
import { BudgetModel } from '../models/Budget/BudgetModel'
import { CSVHeaderConfigModel } from '../models/CSVHeaderConfig/CSVHeaderConfigModel'
import { MoneyMoveModel } from '../models/MoneyMove/MoneyMoveModel'
import { UserModel } from '../models/User/UserModel'
import { YearModel } from '../models/Year/YearModel'

export const entities = [YearModel, UserModel, BudgetModel, BankAccountModel, MoneyMoveModel, CSVHeaderConfigModel]
