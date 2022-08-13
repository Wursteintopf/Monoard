import { defaultFormState } from './FormTypes'
import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: defaultFormState,
  reducers: {},
})

export const formReducer = formSlice.reducer
