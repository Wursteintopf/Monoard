import { Lens } from '../../../data/RootLens'

export interface FormElement {
  label?: string
}

export interface FormInputElement<A> extends FormElement {
  lens: Lens<A> | Lens<A | undefined>
  disabled?: boolean
  onChangeSideEffect?: (value: A) => void
  variant?: 'outlined' | 'filled' | 'standard'
  setDirty?: Lens<boolean>
}
