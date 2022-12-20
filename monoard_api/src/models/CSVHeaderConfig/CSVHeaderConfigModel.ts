import { BaseModel } from '@wursteintopf/crudpress'
import { CSVHeaderConfig } from '@wursteintopf/monoard_data_models'
import { Column, Entity, OneToOne } from 'typeorm'
import { BankAccountModel } from '../BankAccount/BankAccountModel'

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
