import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { BankAccount } from '../../../data_types/BankAccount'
import { BaseWithUserModel } from '../BaseModel/BaseWithUserModel'
import { MoneyMoveModel } from '../MoneyMove/MoneyMoveModel'
import { UserModel } from '../User/UserModel'
import { CSVHeaderConfigModel } from '../CSVHeaderConfig/CSVHeaderConfigModel'

@Entity()
export class BankAccountModel extends BaseWithUserModel implements BankAccount {
  @Column()
    name: string
  
  @Column({ unique: true })
    slug: string
  
  @Column('real', { precision: 10, scale: 2 })
    balance: number
  
  @Column({ unique: true, nullable: true })
    iban: string
  
  @Column()
    paypalType: boolean
  
  @OneToOne(() => BankAccountModel, bankAccount => bankAccount.connectedPayPalAccount, { cascade: true })
  @JoinColumn()
    connectedBankAccount?: BankAccountModel
  
  @OneToOne(() => BankAccountModel, bankAccount => bankAccount.connectedBankAccount)
    connectedPayPalAccount?: BankAccountModel
  
  @OneToOne(() => CSVHeaderConfigModel, csvHeaderconfig => csvHeaderconfig.bankAccount, { cascade: true })
  @JoinColumn()
    csvHeaderConfig?: CSVHeaderConfigModel
  
  @ManyToOne(() => UserModel, user => user.bankAccounts)
    user?: UserModel
  
  @OneToMany(() => MoneyMoveModel, moneyMove => moneyMove.bankAccount)
    moneyMoves: MoneyMoveModel[]
}
