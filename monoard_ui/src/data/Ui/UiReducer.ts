import { createSlice } from '@reduxjs/toolkit'
import { defaultUiState } from './UiTypes'

const uiSlice = createSlice({
  name: 'account',
  initialState: defaultUiState,
  reducers: {},
})

export const uiReducer = uiSlice.reducer
