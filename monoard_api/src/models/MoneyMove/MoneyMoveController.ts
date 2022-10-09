import { UserModel } from './../User/UserModel'
import { MoneyMoveModel } from './MoneyMoveModel'
import { BaseWithUserController } from './../BaseModel/BaseWithUserController'
import { Between } from 'typeorm'
import { BankAccountController } from '../BankAccount/BankAccountController'
import { BankAccountModel } from '../BankAccount/BankAccountModel'
import moment from 'moment'
import { YearController } from '../Year/YearController'
import { YearModel } from '../Year/YearModel'

export class MoneyMoveController extends BaseWithUserController<MoneyMoveModel> {
  public async createMultipleOwn (
    moneyMoves: Partial<MoneyMoveModel>[],
    userId: number,
  ) {
    const modelArray: MoneyMoveModel[] = []
    const bankAccountController = new BankAccountController(BankAccountModel)
    const yearController = new YearController(YearModel)

    const ibans = await bankAccountController.readAllIBans(userId)
    const activeYear = await yearController.readActiveYear(userId)

    await Promise.all(
      moneyMoves.filter(m => moment(m.date).year() === activeYear.year).map(async (moneyMove) => {
        // Existing moneyMoves should not be overwritten
        const checkExisting = await this.readByOwn(moneyMove, userId)
        if (checkExisting.length === 0) {
          const bankAccount = await bankAccountController.readOneByOwn({ id: moneyMove.bankAccount as unknown as number }, userId)
          // Its not a PayPal Account, just add it
          if (!bankAccount.paypalType) {
            const model = new this.ModelConstructor()
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
            const model = new this.ModelConstructor()
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

  public async readByBankAccountInRange (
    bankAccountSlug: string,
    userId: number,
    from: Date,
    to: Date,
  ): Promise<MoneyMoveModel[]> {
    const moneyMoves = await this.repository.find({
      where: {
        bankAccount: { slug: bankAccountSlug },
        user: { id: userId },
        date: Between(from, to),
      },
      order: { date: 'ASC' },
      relations: ['user', 'bankAccount', 'manualBudget'],
    })
    return moneyMoves.map(m => {
      m.user = undefined
      m.amount = Number(m.amount)
      return m
    })
  }

  public async readInRange (
    userId: number,
    from: Date,
    to: Date,
  ): Promise<MoneyMoveModel[]> {
    const moneyMoves = await this.repository.find({
      where: {
        user: { id: userId },
        date: Between(from, to),
      },
      order: { date: 'ASC' },
      relations: ['user', 'bankAccount', 'manualBudget'],
    })
    return moneyMoves.map(m => {
      m.user = undefined
      m.amount = Number(m.amount)
      return m
    })
  }
}
