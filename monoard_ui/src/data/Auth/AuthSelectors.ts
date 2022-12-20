import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './../RootReducer'
import { Role } from '@wursteintopf/monoard_data_models'

const authState = (state: RootState) => state.auth

export const selectIsLoggedIn = createSelector(
  authState,
  state => state.self.role !== Role.UNAUTHENTICATED,
)

export const useIsLoggedIn = () => {
  return useSelector(selectIsLoggedIn)
}
