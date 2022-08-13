import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { authApi } from '../../data/Auth/AuthReducer'
import { useIsLoggedIn } from '../../data/Auth/AuthSelectors'
import LoadingIndicator from '../../design/components/LoadingIndicator/LoadingIndicator'

const PrivateRoute = ({ children }: any) => {
  const [checkSession, checkSessionResult] = authApi.endpoints.checkSession.useMutation()

  useEffect(() => {
    checkSession()
  }, [])

  const loggedIn = useIsLoggedIn()
  const isLoading = checkSessionResult.isLoading || checkSessionResult.isUninitialized

  if (isLoading) return <LoadingIndicator />

  if (!loggedIn) return <Navigate to='/login' replace />

  return children
}

export default PrivateRoute
