import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../data/Auth/AuthReducer'
import { rootLens } from '../../data/RootLens'
import { Role } from '../../data_types/Role'
import BackgroundGradient from '../../design/components/BackgroundGradient/BackgroundGradient'
import Card from '../../design/components/Card/Card'
import Center from '../../design/components/LayoutElements/Center'
import Form from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import FormTextInput from '../../design/components/FormElements/FormTextInput'
import LoadingIndicator from '../../design/components/LoadingIndicator/LoadingIndicator'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [checkSession, checkSessionResult] = authApi.endpoints.checkSession.useMutation()

  useEffect(() => {
    checkSession()
  }, [])

  const auth = rootLens.auth.self.role.select()

  useEffect(() => {
    if (auth !== Role.UNAUTHENTICATED) navigate('/')
  }, [auth])

  const loginForm = rootLens.form.loginForm
  const [login, loginResult] = authApi.endpoints.login.useMutation()

  const doLogin = () => {
    const username = loginForm.username.get()
    const password = loginForm.password.get()

    login({ username, password })
      .unwrap()
      .then(() => {
        loginForm.username.set('')
        loginForm.password.set('')
        navigate('/')
      })
      // TODO: Add some sort of error catching here
      .catch(() => {
        loginForm.username.set('')
        loginForm.password.set('')
        console.log('some meaningfull log')
      })
  }

  const isLoading = checkSessionResult.isLoading || loginResult.isLoading

  if (isLoading) return <LoadingIndicator />

  return (
    <BackgroundGradient>
      <Center>
        <Card>
          <Form>
            <FormTextInput
              lens={loginForm.username}
              label='Benutzername'
            />
            <FormTextInput 
              lens={loginForm.password}
              label='Passwort'
              password
            />
            <FormButton 
              label='Login'
              onClick={doLogin}
            />
          </Form>
        </Card>
      </Center>
    </BackgroundGradient>
  )
}

export default Login
