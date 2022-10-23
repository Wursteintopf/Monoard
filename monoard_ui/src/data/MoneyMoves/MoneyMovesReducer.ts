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
  }),
})

export const moneyMoveSlice = createSlice({
  name: moneyMoveReducerPath,
  initialState: defaultMoneyMoveState,
  reducers: {},
})

export const moneyMoveApiReducer = moneyMoveApi.reducer
export const moneyMoveReducer = moneyMoveSlice.reducer
