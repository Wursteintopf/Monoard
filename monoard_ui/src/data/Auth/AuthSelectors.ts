import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { Role } from '../../data_types/Role'
import { RootState } from './../RootReducer'

const authState = (state: RootState) => state.auth

export const selectIsLoggedIn = createSelector(
  authState,
  state => state.self.role !== Role.UNAUTHENTICATED,
)

export const useIsLoggedIn = () => {
  return useSelector(selectIsLoggedIn)
}
