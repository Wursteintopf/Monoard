import { bankAccountReducerPath, BankAccountReducerPath } from './BankAccountTypes'
import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BankAccount } from '@wursteintopf/monoard_data_models'

export const bankAccountApi = createApi({
  reducerPath: bankAccountReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/bankAccount/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    ...getBaseCrudOwnEndpoints<BankAccount, BankAccountReducerPath>(builder),
    usedSlugs: builder.query<string[], void>({
      query: () => 'usedSlugs',
    }),
  }),
})

export const bankAccountApiReducer = bankAccountApi.reducer
