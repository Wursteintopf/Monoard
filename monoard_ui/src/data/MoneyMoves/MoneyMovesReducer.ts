import { defaultMoneyMoveState, MoneyMoveApiReducerPath, moneyMoveApiReducerPath, moneyMoveReducerPath, SearchInRangeParams } from './MoneyMoveTypes'
import { MoneyMove } from './../../data_types/MoneyMove'
import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'

export const tagTypes = ['moneyMoves']

export const moneyMoveApi = createApi({
  reducerPath: moneyMoveApiReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/moneyMove/',
    credentials: 'include',
  }),
  tagTypes,
  endpoints: builder => ({
    ...getBaseCrudOwnEndpoints<MoneyMove, MoneyMoveApiReducerPath>(builder, tagTypes),
    readByBankAccountInRange: builder.query<MoneyMove[], SearchInRangeParams>({
      query: params => `readByBankAccountInRange?search=${JSON.stringify(params)}`,
      providesTags: tagTypes,
    }),
    readInRange: builder.query<MoneyMove[], Omit<SearchInRangeParams, 'slug'>>({
      query: params => `readInRange?search=${JSON.stringify(params)}`,
      providesTags: tagTypes,
    }),
  }),
})

export const moneyMoveSlice = createSlice({
  name: moneyMoveReducerPath,
  initialState: defaultMoneyMoveState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      moneyMoveApi.endpoints.readByBankAccountInRange.matchFulfilled,
      (state, { payload }) => {
        state.moneyMovesByBankAccount = payload
      },
    )
    builder.addMatcher(
      moneyMoveApi.endpoints.readInRange.matchFulfilled,
      (state, { payload }) => {
        state.moneyMoves = payload
      },
    )
  },
})

export const moneyMoveApiReducer = moneyMoveApi.reducer
export const moneyMoveReducer = moneyMoveSlice.reducer
