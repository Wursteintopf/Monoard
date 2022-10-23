import { budgetApi } from './../Budgets/BudgetReducer'
import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { defaultYearState, yearApiReducerPath, YearApiReducerPath, yearReducerPath } from './YearTypes'
import { Year } from '../../data_types/Year'
import { createSlice } from '@reduxjs/toolkit'
import { Budget } from '../../data_types/Budget'
import { MoneyMove } from '../../data_types/MoneyMove'

export const yearApi = createApi({
  reducerPath: yearApiReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/year/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    ...getBaseCrudOwnEndpoints<Year, YearApiReducerPath>(builder),
    readActive: builder.query<Year, void>({
      query: () => 'readActive',
    }),
  }),
})

export const yearSlice = createSlice({
  name: yearReducerPath,
  initialState: defaultYearState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      yearApi.endpoints.readActive.matchFulfilled,
      (state, { payload: year }) => {
        state.activeYear = {
          ...year,
          budgets: year.budgets as Budget[],
          moneyMoves: year.moneyMoves as MoneyMove[],
        }
        state.fetched = true
      },
    )
    builder.addMatcher(
      budgetApi.endpoints.createOwn.matchFulfilled,
      (state, { payload }) => {
        state.activeYear.budgets.push(payload)
      },
    )
    builder.addMatcher(
      budgetApi.endpoints.updateOwn.matchFulfilled,
      (state, { payload }) => {
        state.activeYear.budgets = [...state.activeYear.budgets.filter(b => b.id !== payload.id), payload]
      },
    )
    builder.addMatcher(
      budgetApi.endpoints.deleteOwn.matchFulfilled,
      (state, { payload }) => {
        state.activeYear.budgets = [...state.activeYear.budgets.filter(b => b.id !== payload.id)]
      },
    )
  },
})

export const yearApiReducer = yearApi.reducer
export const yearReducer = yearSlice.reducer
