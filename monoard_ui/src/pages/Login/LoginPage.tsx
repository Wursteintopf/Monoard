import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../data/Auth/AuthReducer'
import { rootLens } from '../../data/RootLens'
import { Role } from '../../data_types/Role'
import BackgroundGradient from '../../design/components/BackgroundGradient/BackgroundGradient'
import Card from '../../design/components/Card/Card'
import Center from '../../design/components/LayoutElements/Center'
import LoadingIndicator from '../../design/components/LoadingIndicator/LoadingIndicator'
import LoginForm from '../../components/Forms/LoginForm'
import FirstSetUpForm from '../../components/Forms/FirstSetUpForm'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [checkSession, checkSessionResult] = authApi.endpoints.checkSession.useMutation()

  useEffect(() => {
    checkSession()
  }, [])

  const auth = rootLens.auth.self
  const role = auth.role.select()
  const username = auth.username.select()

  useEffect(() => {
    if (role !== Role.UNAUTHENTICATED) navigate('/')
  }, [role])

  const loginResult = authApi.endpoints.login.useMutation()[1]

  const isLoading = checkSessionResult.isLoading || loginResult.isLoading

  if (isLoading) return <LoadingIndicator />

  return (
    <BackgroundGradient>
      <Center>
        <Card>
          {username === 'FIRST_LOGIN' ? <FirstSetUpForm /> : <LoginForm />}
        </Card>
      </Center>
    </BackgroundGradient>
  )
}

export default Login
