import { getBaseCrudOwnEndpoints } from './../Base/getBaseCrudOwnEndpoints'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { yearReducerPath, YearReducerPath } from './YearTypes'
import { Year } from '../../data_types/Year'

export const yearApi = createApi({
  reducerPath: yearReducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/year/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    ...getBaseCrudOwnEndpoints<Year, YearReducerPath>(builder),
  }),
})

export const yearApiReducer = yearApi.reducer
