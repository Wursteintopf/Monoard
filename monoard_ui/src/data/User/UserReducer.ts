import { defaultUserState } from './UserTypes'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'account',
  initialState: defaultUserState,
  reducers: {
    setUserState: (state, action) => {
      state = action.payload
    },
  },
})

export const { setUserState: setAccountState } = userSlice.actions
export const userReducer = userSlice.reducer
