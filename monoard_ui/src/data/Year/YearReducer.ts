import { moneyMoveApi } from './../MoneyMoves/MoneyMovesReducer'
import { budgetApi } from './../Budgets/BudgetReducer'
import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { defaultYearState, MoneyMoveWithSubs, yearApiReducerPath, YearApiReducerPath, yearReducerPath } from './YearTypes'
import { Year } from '../../data_types/Year'
import { createSlice } from '@reduxjs/toolkit'
import { Budget } from '../../data_types/Budget'
import { MoneyMove } from '../../data_types/MoneyMove'
import { BankAccount } from '../../data_types/BankAccount'

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

const assignBudgets = (moneyMoves: MoneyMove[], budgets: Budget[]): MoneyMoveWithSubs[] => 
  moneyMoves.map(moneyMove => {
    if (moneyMove.budget) {
      const budget = typeof moneyMove.budget === 'number' ? budgets.find(b => b.id === moneyMove.budget) : moneyMove.budget
      
      return {
        ...moneyMove,
        bankAccount: moneyMove.bankAccount as BankAccount,
        budget: (budget as Budget),
      } 
    }

    const budget = budgets.find(budget => budget.keywords
      .split(',')
      .filter(k => k !== '')
      .some(keyword => (moneyMove.purpose.includes(keyword) || moneyMove.foreignBankAccount.includes(keyword))))
    
    return {
      ...moneyMove,
      bankAccount: moneyMove.bankAccount as BankAccount,
      budget,
    }
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
          moneyMoves: assignBudgets(year.moneyMoves as MoneyMove[], year.budgets as Budget[]),
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
    builder.addMatcher(
      moneyMoveApi.endpoints.createMultipleOwn.matchFulfilled,
      (state, { payload }) => {
        const ids = payload.map(m => m.id)
        const oldMoves = state.activeYear.moneyMoves.filter(m => !ids.includes(m.id))
        const newMoves = assignBudgets(payload, state.activeYear.budgets)
        state.activeYear.moneyMoves = [...oldMoves, ...newMoves]
      },
    )
    builder.addMatcher(
      moneyMoveApi.endpoints.updateOwn.matchFulfilled,
      (state, { payload }) => {
        const newMoves = assignBudgets([payload], state.activeYear.budgets)
        state.activeYear.moneyMoves = [...state.activeYear.moneyMoves.filter(m => m.id !== payload.id), ...newMoves]
      },
    )
  },
})

export const yearApiReducer = yearApi.reducer
export const yearReducer = yearSlice.reducer
