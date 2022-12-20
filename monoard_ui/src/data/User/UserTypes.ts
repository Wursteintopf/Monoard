import { Role, User } from '@wursteintopf/monoard_data_models'

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
