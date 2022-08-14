import { FirstSetUpForm } from './../Forms/FormTypes'
import { defaultSelf } from '../User/UserTypes'
import { defaultAuthState } from './AuthTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginForm } from '../Forms/FormTypes'
import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../data_types/User'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/user/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    firstSetUp: builder.mutation<User, Omit<FirstSetUpForm, 'isDirty' | 'passwordAgain'>>({
      query: user => ({ url: 'firstSetUp', method: 'PUT', body: user }),
    }),
    login: builder.mutation<User, Omit<LoginForm, 'isDirty'>>({
      query: form => ({ url: 'login', method: 'POST', body: { username: form.username, password: form.password } }),
    }),
    checkSession: builder.mutation<User, void>({
      query: () => 'checkSession',
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: 'logout', method: 'DELETE' }),
    }),
  }),
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuthState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.self = payload
      },
    )
    builder.addMatcher(
      authApi.endpoints.checkSession.matchFulfilled,
      (state, { payload }) => {
        state.self = payload
      },
    )
    builder.addMatcher(
      authApi.endpoints.firstSetUp.matchFulfilled,
      (state, { payload }) => {
        state.self = payload
      },
    )
    builder.addMatcher(
      authApi.endpoints.checkSession.matchRejected,
      state => {
        state.self = defaultSelf
      },
    )
    builder.addMatcher(
      authApi.endpoints.logout.matchPending,
      state => {
        state.self = defaultSelf
      },
    )
  },
})

export const authApiReducer = authApi.reducer
export const authReducer = authSlice.reducer
