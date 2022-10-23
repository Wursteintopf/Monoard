import moment from 'moment'
import { BankAccount, EMPTY_BANKACCOUNT } from '../../data_types/BankAccount'
import { Budget, EMPTY_BUDGET } from '../../data_types/Budget'
import { CSVHeaderConfig } from '../../data_types/CSVHeaderConfig'

export type DefaultFormTypes = {
  isDirty: boolean
}

export const defaultForm: DefaultFormTypes = {
  isDirty: false,
}

export type LoginForm = DefaultFormTypes & {
  username: string
  password: string
}

export const defaultLoginForm: LoginForm = {
  username: '',
  password: '',
  ...defaultForm,
}

export type AddBankAccountForm = DefaultFormTypes & Omit<BankAccount, 'connectedBankAccount'> & {
  connectedBankAccount: number
}

export const defaultAddBankAccountForm: AddBankAccountForm = {
  ...EMPTY_BANKACCOUNT,
  connectedBankAccount: -1,
  ...defaultForm,
}

export type AddBudgetForm = Budget & DefaultFormTypes

export const defaultAddBudgetForm: AddBudgetForm = {
  ...EMPTY_BUDGET,
  ...defaultForm,
}

export type SelectHeaderForm = CSVHeaderConfig & DefaultFormTypes

export const defaultSelectHeaderForm: SelectHeaderForm = {
  date: '',
  dateFormat: '',
  foreignBankAccount: '',
  foreignBankAccountIban: '',
  purpose: '',
  amount: '',
  ...defaultForm,
}

export type YearSidebarForm = DefaultFormTypes & {
  year: number
}

export const defaultYearSidebarForm: YearSidebarForm = {
  year: moment().year(),
  ...defaultForm,
}

export type FirstSetUpForm = DefaultFormTypes & {
  username: string
  password: string
  passwordAgain: string
}

export const defaultFirstSetUpForm: FirstSetUpForm = {
  username: '',
  password: '',
  passwordAgain: '',
  ...defaultForm,
}

export interface FormState {
  loginForm: LoginForm
  addBankAccountForm: AddBankAccountForm
  addBudgetForm: AddBudgetForm
  selectHeaderForm: SelectHeaderForm
  yearSidebarForm: YearSidebarForm
  firstSetUpForm: FirstSetUpForm
}

export const defaultFormState: FormState = {
  loginForm: defaultLoginForm,
  addBankAccountForm: defaultAddBankAccountForm,
  addBudgetForm: defaultAddBudgetForm,
  selectHeaderForm: defaultSelectHeaderForm,
  yearSidebarForm: defaultYearSidebarForm,
  firstSetUpForm: defaultFirstSetUpForm,
}
