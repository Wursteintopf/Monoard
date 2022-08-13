import { createSlice } from '@reduxjs/toolkit'
import { defaultCSVState } from './CSVTypes'

const csvSlice = createSlice({
  name: 'csv',
  initialState: defaultCSVState,
  reducers: {},
})

export const csvReducer = csvSlice.reducer
