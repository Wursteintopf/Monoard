import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../data/Auth/AuthReducer'
import { rootLens } from '../../data/RootLens'
import Form from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import FormTextInput from '../../design/components/FormElements/FormTextInput'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  
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
  
  return (
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
  )
}

export default LoginForm
