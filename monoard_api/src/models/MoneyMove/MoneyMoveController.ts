import { appDataSource } from './../../config/typeOrmDataSource'
import { UserModel } from './../User/UserModel'
import { MoneyMoveModel } from './MoneyMoveModel'
import { BaseWithUserController } from './../BaseModel/BaseWithUserController'
import { Between } from 'typeorm'
import { BankAccountController } from '../BankAccount/BankAccountController'
import { BankAccountModel } from '../BankAccount/BankAccountModel'
import moment from 'moment'
import { YearController } from '../Year/YearController'
import { YearModel } from '../Year/YearModel'
import { monthArray } from '../../../data_types/Month'

export class MoneyMoveController extends BaseWithUserController<MoneyMoveModel> {
  public async createMultipleOwn (
    moneyMoves: Partial<MoneyMoveModel>[],
    userId: number,
  ): Promise<MoneyMoveModel[]> {
    const modelArray: MoneyMoveModel[] = []
    const bankAccountController = new BankAccountController(BankAccountModel, appDataSource)
    const yearController = new YearController(YearModel, appDataSource)

    const ibans = await bankAccountController.readAllIBans(userId)
    const activeYear = await yearController.readActiveYear(userId)

    await Promise.all(
      moneyMoves
        // Filter out all money moves that are not within the active year
        .filter(m => moment(m.date).year() === activeYear.year)
        .map(async (moneyMove) => {
        // Existing moneyMoves should not be overwritten
          const checkExisting = await this.readByOwn(moneyMove, userId)
          if (checkExisting.length === 0) {
            // Create the model and attach it to the active year
            const model = new this.ModelConstructor()
            model.year = activeYear

            // Add the month to the year
            const monthIndex = moment(moneyMove.date).month()
            model.month = monthArray[monthIndex]

            const bankAccount = await bankAccountController.readOneByOwn({ id: moneyMove.bankAccount as unknown as number }, userId)
            // Its not a PayPal Account, just add it
            if (!bankAccount.paypalType) {
              model.set(moneyMove)

              // Check if its an internal move
              if (ibans.includes(model.foreignBankAccountIban)) model.isInternalMove = true

              // If the foreignBankAccount includes "PayPal", check if we find a related PayPal Move
              if (moneyMove.foreignBankAccount?.includes('PayPal')) {
                const date = moment(moneyMove.date).toDate()
                const oneWeekBefore = moment(date).subtract(7, 'days').toDate()
                const otherMove = await this.repository.findOne({
                  where: {
                    bankAccount: { id: bankAccount.connectedPayPalAccount?.id },
                    date: Between(oneWeekBefore, date),
                    user: { id: userId },
                    amount: -(moneyMove.amount as number),
                    isInternalMove: true,
                  },
                  relations: ['bankAccount'],
                })
                if (otherMove) {
                  model.isInternalMove = true
                }
              }

              model.user = userId as unknown as UserModel
              modelArray.push(model)
            }

            // If it is a PayPal Account, handle it a little differently
            if (bankAccount.paypalType) {
            // Add the move itself as usual
              model.set(moneyMove)
              model.user = userId as unknown as UserModel
              modelArray.push(model)

              // If we already detected in the csv that its an internal move, update the related bankAccount moneyMove aswell
              if (moneyMove.isInternalMove) {
                const date = moment(moneyMove.date).toDate()
                const oneWeek = moment(date).add(7, 'days').toDate()
                const search = await this.repository.find({
                  where: {
                    bankAccount: { id: bankAccount.connectedBankAccount?.id },
                    date: Between(date, oneWeek),
                    user: { id: userId },
                    amount: -(moneyMove.amount as number),
                    isInternalMove: false,
                  },
                  relations: ['bankAccount'],
                })
                const otherMove = search.filter(m => m.foreignBankAccount.includes('PayPal'))[0]
                if (otherMove) {
                  otherMove.isInternalMove = true
                  this.repository.save(otherMove)
                }
              }
            }
          }
        }),
    )

    // Update the balance on the related bankAccounts
    for (const moneyMove of modelArray) {
      const bankAccount = await bankAccountController.read(moneyMove.bankAccount as unknown as number)
      bankAccount.balance += moneyMove.amount
      await bankAccountController.update(bankAccount)
    }

    return await this.repository.save(modelArray)
  }
}
