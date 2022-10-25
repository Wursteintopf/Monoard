import { MoneyMoveApiReducerPath, moneyMoveApiReducerPath } from './MoneyMoveTypes'
import { MoneyMove } from './../../data_types/MoneyMove'
import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const moneyMoveApiReducer = moneyMoveApi.reducer
