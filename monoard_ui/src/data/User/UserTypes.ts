import { User } from '../../data_types/User'
import { Role } from '../../data_types/Role'

export interface UserState {
  self: User
}

export const defaultSelf: User = {
  id: 0,
  username: '',
  role: Role.UNAUTHENTICATED,
}

export const defaultUserState: UserState = {
  self: defaultSelf,
}
