import { Role, User } from '@wursteintopf/monoard_data_models'
import { authApiReducer } from './AuthReducer'

export type AuthApiState = ReturnType<typeof authApiReducer>

export const defaultAuthApiState: AuthApiState = {
  queries: {},
  mutations: {},
  provided: [],
  subscriptions: {},
  config: {
    reducerPath: 'authApi',
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
    online: false,
    focused: false,
    middlewareRegistered: false,
    keepUnusedDataFor: 60,
  },
}

export interface AuthState {
  self: User
}

export const defaultSelf: User = { id: 0, username: '', role: Role.UNAUTHENTICATED }

export const defaultAuthState: AuthState = {
  self: defaultSelf,
}
