import { Column, Entity, OneToOne } from 'typeorm'
import { BankAccountModel } from '../BankAccount/BankAccountModel'
import { BaseModel } from '../BaseModel/BaseModel'
import { CSVHeaderConfig } from './../../../data_types/CSVHeaderConfig'

@Entity()
export class CSVHeaderConfigModel extends BaseModel implements CSVHeaderConfig {
  @Column()
    date: string

  @Column()
    dateFormat: string

  @Column()
    foreignBankAccount: string

  @Column()
    foreignBankAccountIban: string

  @Column()
    purpose: string

  @Column()
    amount: string

  @OneToOne(() => BankAccountModel, bankAccount => bankAccount.csvHeaderConfig)
    bankAccount: BankAccountModel
}
