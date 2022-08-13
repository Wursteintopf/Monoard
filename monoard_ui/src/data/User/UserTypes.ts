import { User } from '../../data_types/User'
import { Role } from '../../data_types/Role'

export interface LoginForm {
  username: string
  password: string
}

export const defaultLoginForm: LoginForm = {
  username: '',
  password: '',
}

export interface UserState {
  self: User
  forms: {
    loginForm: LoginForm
  }
}

export const defaultSelf: User = {
  id: 0,
  username: '',
  role: Role.UNAUTHENTICATED,
}

export const defaultUserState: UserState = {
  self: defaultSelf,
  forms: {
    loginForm: defaultLoginForm,
  },
}
