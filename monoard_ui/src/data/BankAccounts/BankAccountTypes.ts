import { getDefaultApiState } from '../Base/getDefaultApiState'
import { bankAccountApiReducer } from './BankAccountReducer'

export type BankAccountReducerPath = 'bankAccountApi'
export const bankAccountReducerPath: BankAccountReducerPath = 'bankAccountApi'

export type BankAccountApiState = ReturnType<typeof bankAccountApiReducer>

export const defaultBankAccountApiState: BankAccountApiState = getDefaultApiState<BankAccountReducerPath>(bankAccountReducerPath)
