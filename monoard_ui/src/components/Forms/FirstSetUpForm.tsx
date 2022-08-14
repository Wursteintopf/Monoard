import React from 'react'
import { authApi } from '../../data/Auth/AuthReducer'
import { rootLens } from '../../data/RootLens'
import Form from '../../design/components/FormElements/Form'
import FormButton from '../../design/components/FormElements/FormButton'
import FormText from '../../design/components/FormElements/FormText'
import FormTextInput from '../../design/components/FormElements/FormTextInput'
import { Headline } from '../../design/components/Typography/Typography'

const FirstSetUpForm: React.FC = () => {
  const firstSetUpForm = rootLens.form.firstSetUpForm

  const password = firstSetUpForm.password.select()
  const passwordAgain = firstSetUpForm.passwordAgain.select()

  const passwordsMatch = password === passwordAgain

  const [firstSetUpMutation] = authApi.endpoints.firstSetUp.useMutation()

  const setUp = () => {
    firstSetUpMutation({
      username: firstSetUpForm.username.get(),
      password: firstSetUpForm.password.get(),
    })
  }

  return (
    <Form>
      <FormText>
        <Headline>Willkommen bei Monoard! 👋</Headline>
        Bitte erstelle deinen ersten Administor Account.
      </FormText>
      <FormTextInput
        lens={firstSetUpForm.username}
        label='Benutzername'
      />
      <FormTextInput
        lens={firstSetUpForm.password}
        label='Passwort'
        inputInvalid={!passwordsMatch}
        errorText='Die beiden Passwörter stimmen nicht überein.'
        password
      />
      <FormTextInput
        lens={firstSetUpForm.passwordAgain}
        label='Passwort wiederholen'
        inputInvalid={!passwordsMatch}
        password
      />
      <FormButton
        label='Speichern'
        disabled={!firstSetUpForm.username.get() || !firstSetUpForm.password.get() || !passwordsMatch}
        onClick={setUp}
      />
    </Form>
  )
}

export default FirstSetUpForm
