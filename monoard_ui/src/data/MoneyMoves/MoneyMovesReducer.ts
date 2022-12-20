import { MoneyMoveApiReducerPath, moneyMoveApiReducerPath } from './MoneyMoveTypes'
import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MoneyMove } from '@wursteintopf/monoard_data_models'

export const tagTypes = ['moneyMoves']

export const moneyMoveApi = createApi({
  reducerPath: moneyMoveApiReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/moneyMove/',
    credentials: 'include',
  }),
  tagTypes,
  endpoints: builder => ({
    ...getBaseCrudOwnEndpoints<MoneyMove, MoneyMoveApiReducerPath>(builder, tagTypes),
  }),
})

export const moneyMoveApiReducer = moneyMoveApi.reducer
