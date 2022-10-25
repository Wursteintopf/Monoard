import { defaultUiState, UiState } from './Ui/UiTypes'
import { budgetApi, budgetApiReducer, budgetReducer } from './Budgets/BudgetReducer'
import { moneyMoveApi, moneyMoveApiReducer } from './MoneyMoves/MoneyMovesReducer'
import { MoneyMoveApiState, defaultMoneyMoveApiState } from './MoneyMoves/MoneyMoveTypes'
import { CSVState, defaultCSVState } from './CSV/CSVTypes'
import { BankAccountApiState, defaultBankAccountApiState } from './BankAccounts/BankAccountTypes'
import { bankAccountApi, bankAccountApiReducer } from './BankAccounts/BankAccountReducer'
import { formReducer } from './Forms/FormReducer'
import { defaultFormState, FormState } from './Forms/FormTypes'
import { userReducer } from './User/UserReducer'
import { AnyAction, configureStore, createAction, Reducer } from '@reduxjs/toolkit'
import { UserState, defaultUserState } from './User/UserTypes'
import { AuthApiState, AuthState, defaultAuthApiState, defaultAuthState } from './Auth/AuthTypes'
import { authApi, authApiReducer, authReducer } from './Auth/AuthReducer'
import { csvReducer } from './CSV/CSVReducer'
import { BudgetApiState, BudgetState, defaultBudgetApiState, defaultBudgetState } from './Budgets/BudgetTypes'
import { defaultYearApiState, defaultYearState, YearApiState, YearState } from './Year/YearTypes'
import { yearApi, yearApiReducer, yearReducer } from './Year/YearReducer'
import { uiReducer } from './Ui/UiReducer'

export const setRootStateAction = createAction<RootState>('SET_ROOT_STATE')

export interface RootState {
  account: UserState
  csv: CSVState
  form: FormState
  authApi: AuthApiState
  auth: AuthState
  bankAccountApi: BankAccountApiState
  moneyMoveApi: MoneyMoveApiState
  budgetApi: BudgetApiState
  budget: BudgetState
  yearApi: YearApiState
  year: YearState
  ui: UiState
}

export const defaultRootState: RootState = {
  account: defaultUserState,
  csv: defaultCSVState,
  form: defaultFormState,
  authApi: defaultAuthApiState,
  auth: defaultAuthState,
  bankAccountApi: defaultBankAccountApiState,
  moneyMoveApi: defaultMoneyMoveApiState,
  budgetApi: defaultBudgetApiState,
  budget: defaultBudgetState,
  yearApi: defaultYearApiState,
  year: defaultYearState,
  ui: defaultUiState,
}

const rootReducer: Reducer<RootState, AnyAction> = (state = defaultRootState, action: AnyAction) => {
  switch (action.type) {
    case (setRootStateAction.type):
      return action.payload
    default:
      return {
        account: userReducer(state.account, action),
        csv: csvReducer(state.csv, action),
        form: formReducer(state.form, action),
        authApi: authApiReducer(state.authApi, action),
        auth: authReducer(state.auth, action),
        bankAccountApi: bankAccountApiReducer(state.bankAccountApi, action),
        moneyMoveApi: moneyMoveApiReducer(state.moneyMoveApi, action),
        budgetApi: budgetApiReducer(state.budgetApi, action),
        budget: budgetReducer(state.budget, action),
        yearApi: yearApiReducer(state.yearApi, action),
        year: yearReducer(state.year, action),
        ui: uiReducer(state.ui, action),
      }
  }
}

export const store = configureStore<RootState>({
  reducer: rootReducer,
  // @ts-expect-error
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat(bankAccountApi.middleware)
    .concat(authApi.middleware)
    .concat(budgetApi.middleware)
    .concat(moneyMoveApi.middleware)
    .concat(yearApi.middleware),
})
