import { BudgetApiReducerPath, budgetApiReducerPath, budgetReducerPath, defaultBudgetState, SearchInMonthParams } from './BudgetTypes'
import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Budget } from '../../data_types/Budget'
import { createSlice } from '@reduxjs/toolkit'

export const budgetApi = createApi({
  reducerPath: budgetApiReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/budget/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    ...getBaseCrudOwnEndpoints<Budget, BudgetApiReducerPath>(builder),
    readInMonth: builder.query<Budget[], SearchInMonthParams>({
      query: params => `readInMonth?search=${JSON.stringify(params)}`,
    }),
    usedSlugs: builder.query<string[], void>({
      query: () => 'usedSlugs',
    }),
  }),
})

export const budgetSlice = createSlice({
  name: budgetReducerPath,
  initialState: defaultBudgetState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      budgetApi.endpoints.readInMonth.matchFulfilled,
      (state, { payload }) => {
        state.currentBudgets = payload
      },
    )
  },
})

export const budgetApiReducer = budgetApi.reducer
export const budgetReducer = budgetSlice.reducer
